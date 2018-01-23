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

  patchPost(id: string, image?: string): Observable<Post> {
    let images: string[] = [image];
    id+='/';
    return this.makeRequest(this.postsUrl + id, 'PATCH', { images })
  }
}
