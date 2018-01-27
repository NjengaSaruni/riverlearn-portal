/**
 * Created by saruni on 1/14/18.
 */

import {CommonService } from './common.service';
import {Post, PostComment} from "../models/messaging.models";
import {Observable} from "rxjs";
import {URLSearchParams} from "@angular/http";

export class MessagingService extends CommonService {
  private messagingUrl: string = 'messaging/';
  private postsUrl: string = this.messagingUrl + 'posts/';
  private postCommentsUrl: string = this.messagingUrl + 'post_comments/';

  getPosts(q?: string, created_by?: string): Observable<Post[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('q', q);
    params.set('created_by', created_by);
    return this.makeRequest(this.postsUrl, 'GET', null, params);
  }

  createPost(text: string): Observable<Post> {
    return this.makeRequest(this.postsUrl, 'POST', { text })
  }

  patchPost(id: string, image?: string, liker?: string): Observable<Post> {
    id+='/';
    if(image){
      let images: string[] = [image];
      return this.makeRequest(this.postsUrl + id, 'PATCH', { images})
    }
    if(liker){
      let likers: string[] = [liker];
      return this.makeRequest(this.postsUrl + id, 'PATCH', { likers})
    }

  }

  createPostComment(text: string, post: string): Observable<PostComment> {
    return this.makeRequest(this.postCommentsUrl, 'POST', {post, text})
  }

  getPostComments(q?: string, post?: string): Observable<PostComment[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('q', q);
    params.set('post', post);
    return this.makeRequest(this.postCommentsUrl, 'GET', null, params)
  }


}
