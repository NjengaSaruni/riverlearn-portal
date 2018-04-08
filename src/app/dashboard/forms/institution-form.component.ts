/**
 * Created by saruni on 8/19/17.
 */

import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Institution, InstitutionType} from '../../common/models/institutions.models';
import {InstitutionService} from '../../common/services/institutions.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonService, delay, JwtHelper} from '../../common/services/common.service';
import {User} from '../../common/models/users.models';
import {UserService} from '../../common/services/user.service';
import {Router} from '@angular/router';


declare var $: any;

@Component({
  selector: 'institution-form',
  templateUrl: './institution-form.component.html',
  styleUrls: ['./institution-form.component.css' ]
})

export class InstitutionFormComponent implements OnInit, AfterViewInit {
  constructor(
    public formBuilder: FormBuilder,
    public institutionService: InstitutionService,
    public userService: UserService,
    public commonService: CommonService,
    public router: Router
  ) {}

  public user: User;

  public institutionForm: FormGroup;
  public contentReady: boolean = false;
  public institutionTypes: InstitutionType[];
  public institutions: Institution[];
  public selectedType: InstitutionType = new InstitutionType();

  public domainTaken: boolean = false;
  public comparingDomains: boolean = false;

  @ViewChild('fileInput') fileInput : any;

  ngOnInit() {
    this.getInstitutionTypes();
    this.getInstitutions();
    this.getUser();

    $(document).ready(function() {
      $('#selectInstitutionType')
        .dropdown();

      $('.ui.accordion').accordion();

    });

    this.institutionForm = this.formBuilder.group({
      name: ['', Validators.required],
      domain:['', Validators.required],
      motto: [''],
      mobile: ['', Validators.required],
      email: ['', Validators.required],
      website: [''],
      logo: [''],
      address: this.formBuilder.group({
        postalAddress: [''],
        postalCode: [''],
        town: ['']
      }),
      type: [this.selectedType.name, Validators.required],
      usePersonal: [false]
    });
  }

  async onKey(event: any) {
    this.comparingDomains = true;
    let value: string;
    let typeName: string = '';

    for (let type of this.institutionTypes) {
      if (type.id === this.institutionForm.get('type').value){
        typeName = type.name;
        break;
      }
    }

    this.institutionForm.patchValue({
      domain: this.institutionForm.get('name').value.toLowerCase().split(' ')[0] +  typeName.split(' ')[0]
    });

    value = this.institutionForm.get('domain').value.toLowerCase();

    await delay(30);

    this.institutions.forEach((institution, index) => {
      if (value === '' || value === institution.domain) {
        this.domainTaken = true;
        value += index.toString();
      }
      else {
        this.domainTaken = false;
      }
    });
    this.comparingDomains = false;
  }

  usePersonalContacts(){
    if (this.institutionForm.get('usePersonal').value){
      this.institutionForm.patchValue({
        mobile: this.user.mobile,
        email: this.user.email
      })
    }
    else{
      this.institutionForm.patchValue({
        mobile: '',
        email: ''
      })
    }
  }

  createInstitution(): void {
    let name = this.institutionForm.get('name').value;
    let motto= this.institutionForm.get('motto').value;;
    let mobile = this.institutionForm.get('mobile').value;
    let email = this.institutionForm.get('email').value;
    let website = this.institutionForm.get('website').value;
    let postal_address = this.institutionForm.get('address.postalAddress').value + ' ' +
      this.institutionForm.get('address.town').value + ' ' +
        this.institutionForm.get('address.postalCode');
    let type = this.institutionForm.get('type').value;
    let domain = this.institutionForm.get('domain').value;
    let logo: any = null;

    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      logo = fi.files[0];
    }
    this.institutionService.createInstitution(name, motto, mobile, email, website, postal_address, type, domain, logo)
      .subscribe(
        data => {
          this.router.navigate(['dashboard']);
        },
        error => console.log(error)
      );
  }

  ngAfterViewInit(){
    this.contentReady = true;
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
  getInstitutionTypes() {
    this.institutionService.getInstitutionTypes()
      .subscribe(
        types => this.institutionTypes  = types,
        error => console.log(error)
      );
  }

  getInstitutions() {
    this.institutionService.getInstitutions()
      .subscribe(
        institutions => this.institutions  = institutions,
        error => console.log(error)
      );
  }

}
