/**
 * Created by saruni on 8/18/17.
 */

import {Component, OnInit} from '@angular/core';
import {UserService} from "../common/services/user.service";
import {MatSnackBar} from "@angular/material";
import {User, UserProfile} from "../common/models/users.models";
import {AnonymousSubscription} from "rxjs/Subscription";
import {Observable} from "rxjs";
import {MessagingService} from "../common/services/messaging.service";
import {Post, PostComment} from "../common/models/messaging.models";
import {Title} from "@angular/platform-browser";
import {CommonService, JwtHelper} from "../common/services/common.service";
import {UploadService} from "../common/services/uploads.service";
import {Image} from "../common/models/uploads.models"

declare var $: any;

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css' ]
})

export class FeedComponent implements OnInit {
  selectedImage: Image;
  userId: any;
  userProfile: UserProfile;
  loggedInUser: User;
  posts: Post[];
  post: string ;
  images: any[] = [];

  contentReady: boolean = false;
  timerSubscription: AnonymousSubscription;
  profiles: UserProfile[];

  jwtHelper: JwtHelper = new JwtHelper();
  firstLoad: boolean = true;
  selectedPostComments: PostComment[];
  hideGallery: boolean;

  constructor(
    private userService: UserService,
    private commonService: CommonService,
    private uploadService: UploadService,
    private messaggingService: MessagingService,
    public snackBar: MatSnackBar,
    private titleService: Title,
  ) {}

  ngOnInit() {
    let token = this.commonService.getJwtToken();
    let user = this.jwtHelper.decodeToken(token);
    this.userId = user.user_id;
    this.getUser();
    this.getPosts();
    this.galleryPreview();

  }


  private galleryPreview() {
    this.hideGallery = false;
    $(function () {
      // Multiple images preview in browser
      var imagesPreview = function (input, placeToInsertImagePreview) {

        if (input.files) {
          var filesAmount = input.files.length;

          for (let i = 0; i < filesAmount; i++) {
            var reader = new FileReader();

            reader.onload = function (event: any) {
              $($.parseHTML('<img class="ui image">')).attr('src', event.target.result).appendTo(placeToInsertImagePreview);
            };

            reader.readAsDataURL(input.files[i]);
          }

        }

      };
      $('#gallery-photo-add').on('change', function () {
        imagesPreview(this, 'div.gallery');
      });
    });
  }

  getProfiles(): void {
    this.userService.getUserProfiles()
      .subscribe(
        profiles => {
          this.profiles = profiles;
        },
        error => this.openSnackBar(error)
      )
  }

  getPosts(): void {
    if(this.firstLoad){
      this.contentReady = false;
    }

    this.messaggingService.getPosts()
      .subscribe(
        posts => {
          this.contentReady = true;
          this.firstLoad = false;
          this.posts = posts;
          this.subscribeToPosts();
        },
        error => this.openSnackBar(error)
      )
  }

  getUser(): User{
    let user: User = null;
    this.userService.getUser(this.userId)
      .subscribe(
        user => {
          this.loggedInUser = user;
          this.titleService.setTitle(user.full_name + ' :: Feed');
          this.userProfile  = user.profiles[0];
        },
        error => this.openSnackBar(error)
      );
    return user;
  }

  private subscribeToPosts(): void {
    this.timerSubscription = Observable.timer(5000).first().subscribe(() => {
      this.getUser();
      this.getPosts();
    });
  }

  openSnackBar(message? : string, duration: number = 3000) {
    this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }


  togglePostButton(): void {
    $('#post-post-button').transition('fade')
  }

  savePost(){
    if(this.post){
      this.hideGallery = true;
      this.messaggingService.createPost(this.post)
        .subscribe(
          post => {
            this.post = null;
            for(let image of ($('#gallery-photo-add').prop('files'))){
              this.uploadService.uploadImage(image)
                .subscribe(
                  image => {
                    this.messaggingService.patchPost(post.id, image.id)
                      .subscribe(
                        post => this.getUser(),
                        error => this.openSnackBar(error)
                      );
                  },
                  error => this.openSnackBar(error),
                  () => this.openSnackBar('Loaded posts')
                );
            }
            $('#gallery-photo-add').reset();

            $('div#test > img').remove();
          },
          error => this.openSnackBar(error)
        );
      this.getPosts();
    }
  }

  like(post: Post){
    this.messaggingService.patchPost(post.id, null, this.loggedInUser.id)
      .subscribe(
        post => {
          console.log(post);
          this.getPosts();
        },
        error => this.openSnackBar(error)
      )
  }


  openImageModal(image: Image){
    this.selectedImage = image;
    this.uploadService.getImage(image.id)
      .subscribe(
        image => this.selectedImage = image,
        error => this.openSnackBar(error)
      );
    $('#image-modal').modal('show');
  }

  openComments(post?: Post, i?: number){
    this.getPostComments(post);
    if(i !== null){
      let element: string = '#comments'+i.toString();
      $(element).transition('slide');
    }
  }

  private getPostComments(post: Post) {
    this.messaggingService.getPostComments(null, post.id)
      .subscribe(
        post_comments => this.selectedPostComments = post_comments,
        error => this.openSnackBar(error)
      )
    ;
  }

  submitReply(event: any, post: Post){
    this.messaggingService.createPostComment(event.target.value, post.id)
      .subscribe(
        postComment => this.getPostComments(post),
        error => this.openSnackBar(error)
      );
  }

}

