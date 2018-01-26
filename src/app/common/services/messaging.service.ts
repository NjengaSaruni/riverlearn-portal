/**
 * Created by saruni on 1/14/18.
 */

import {CommonService } from './common.service';
import {Post} from "../models/messaging.models";
import {Observable} from "rxjs";

export class MessagingService extends CommonService {
  private messagingUrl: string = 'messaging/';
  private postsUrl: string = this.messagingUrl + 'posts/';

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
}
