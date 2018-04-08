/**
 * Created by saruni on 7/22/17.
 */

import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../common/services/user.service';
import {User, UserProfile} from '../common/models/users.models';
import {CommonService, JwtHelper} from '../common/services/common.service';
import {MatSnackBar} from "@angular/material";
import {Image} from "../common/models/uploads.models";
import {Title} from "@angular/platform-browser";
import {extractFile, UploadService} from "../common/services/uploads.service";

declare var $: any;

let getUser = function (id: string) {
  this.userService.getUser(id)
    .subscribe(
      user => {
        this.loggedInUser = user;
        this.titleService.setTitle(user.full_name + ' :: RiverLearn');
        this.userProfile = user.profiles[0];
      },
      error => this.openSnackBar(error)
    );
};
@Component({
  selector: 'profile',
  templateUrl: './user-detail.component.html',
  styleUrls: [
    './user-detail.component.css'
  ]
})

export class UserDetailComponent implements OnInit {
  userProfile: UserProfile;
  image: Image;

  public loggedInUser: User;

  @ViewChild('fileInput') fileInput : any;
  jwtHelper: JwtHelper = new JwtHelper();

  public errorMessage: string;
  constructor(
    public commonService: CommonService,
    public userService: UserService,
    public uploadService: UploadService,
    public snackBar: MatSnackBar,
    public titleService: Title
  ) {}


  ngOnInit():void {
    let token = this.commonService.getJwtToken();
    let user = this.jwtHelper.decodeToken(token);
    this.getUser(user.user_id);
    UserDetailComponent.semanticEvents();
  }

  public static semanticEvents() {
    $('.image').dimmer({
      on: 'hover'
    });

    $('.ui.sticky')
      .sticky()
    ;
  }

  openSnackBar(message? : string, duration: number = 3000) {
    this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }

  getUser(id: string): User{
    let user: User = null;
    getUser.call(this, id);
    return user;
  }

  fileEvent(event: any) {
    let image: any = {};
    let url: any;
    let types = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    url = extractFile.call(this, url);

    if(types.find(item => item == url.type) == undefined){
      this.openSnackBar('Incorrect file format')
      return;
    }

    image.url = url;

    this.uploadService.uploadImage(url)
      .subscribe(
        image => {
          this.userService.createUserProfile(image.id)
            .subscribe(
              profile => this.getUser(this.loggedInUser.id),
              error => this.openSnackBar(error)
            )
        },
        error => this.openSnackBar(error)
      );

  }
}
