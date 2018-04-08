/**
 * Created by saruni on 8/14/17.
 */
import 'rxjs/add/operator/catch';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {JoinRequest, User} from '../../common/models/users.models';
import {Institution} from '../../common/models/institutions.models';
import {UserService} from '../../common/services/user.service';
import {CommonService, JwtHelper} from '../../common/services/common.service';
import {InstitutionService} from '../../common/services/institutions.service';

declare var $: any;


@Component({
  selector: 'setup',
  templateUrl: './setup.component.html',
  styleUrls: [
    './setup.component.css'
  ]
})

export class SetupComponent implements OnInit {
  public user: User;
  public institutions: Institution[];
  public errorMessage: Error;
  public selectedInstitution: Institution;
  public request: JoinRequest;
  public requests: JoinRequest[];
  public notes: string;
  public requestSubmitted: boolean = false;
  public showErrorMessage = false;
  // FIXME: Error message being show before the request.institution loads

  constructor(
    public userService: UserService,
    public commonService: CommonService,
    public institutionService: InstitutionService,
    public router: Router
  ){}

  ngOnInit(): void {
    this.getUser();
    this.getInstitutions();
    this.getJoinRequests();

    $(document).ready(function() {
      $('#searchInstitutions')
        .dropdown();
      $('#searchInstitutions1')
        .dropdown();

    });
  }

  getJoinRequests(): void {
    this.userService.getJoinRequests()
      .subscribe(
        requests => this.requests = requests,
        error => this.errorMessage = error.message);
  }

  getInstitutions(): void {
    this.institutionService.getInstitutions()
      .subscribe(
        institutions => this.institutions = institutions,
        error => this.errorMessage = error.message);
  }

  selectInstitution(institution: Institution){
      this.selectedInstitution = institution;
  }

  joinInstitution(){
      // FIXME: Cleverly redirect user to dashboard on creating a join request
    for(let req of this.requests){
      if(req.created_by.id === this.user.id){
        this.requestSubmitted = true;
        this.request = req;
        return;
      }
    }
    this.userService.createInstitutionJoinRequest(this.selectedInstitution.id, this.notes)
      .subscribe(
        data => {
          this.request = data;
          this.requestSubmitted = true;
          this.router.navigate(['dashboard'])
        },
        handleJoinError
      );

    function handleJoinError(error: any) {
      if(error.status === 400){
        console.log(error);
      }
    }

    // window.location.reload();
  }

  getUser(): void{
    let jwtHelper: JwtHelper = new JwtHelper();
    let errorMessage: string;
    let token = this.commonService.getJwtToken();
    let user = jwtHelper.decodeToken(token);
    this.userService.getUser(user.user_id)
      .subscribe(
        user => this.user = user,
        error => errorMessage = <any>error);
  }

  closeSetupModal(){
    $('.modal').transition('slide out');
    this.router.navigate(['dashboard']);
  }
}
