/**
 * Created by saruni on 8/20/17.
 */

import {CommonService } from './common.service';
import {Observable} from "rxjs";
import {Image} from "../models/uploads.models";


export let extractFile = function (url: any) {
  let fi = this.fileInput.nativeElement;
  if (fi.files && fi.files[0]) {
    url = fi.files[0];
  }
  return url;
};


export class UploadService extends CommonService {
  private uploadsUrl: string = 'uploads/';
  private imagesUrl: string = this.uploadsUrl + 'images/';

  uploadImage(fileToUpload: any, caption?: string, description?: string) {
    let input = new FormData();
    input.append('url', fileToUpload);
    input.append('caption', caption);
    input.append('description', description);

    return this.makeRequest(this.imagesUrl, 'POST', input);
  }

  getImage(id: string): Observable<Image>{
    id += '/';
    return this.makeRequest(this.imagesUrl + id , 'GET')
  }
}
