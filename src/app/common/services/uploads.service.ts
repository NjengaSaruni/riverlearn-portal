/**
 * Created by saruni on 8/20/17.
 */

import {CommonService } from './common.service';

export class UploadService extends CommonService {
  private uploadsUrl: string = 'uploads/';
  private imagesUrl: string = this.uploadsUrl + 'images/';

  uploadImage(fileToUpload: any, caption: string = '', description: string = '') {
    let input = new FormData();
    input.append('url', fileToUpload);
    input.append('caption', caption);
    input.append('description', description);

    return this.makeRequest(this.imagesUrl, 'POST', input);
  }
}
