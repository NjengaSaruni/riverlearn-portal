/**
 * Created by saruni on 8/20/17.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_service_1 = require("./common.service");
var UploadService = (function (_super) {
    __extends(UploadService, _super);
    function UploadService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.uploadsUrl = 'uploads/';
        _this.imagesUrl = _this.uploadsUrl + 'images/';
        return _this;
    }
    UploadService.prototype.uploadImage = function (fileToUpload, caption, description) {
        if (caption === void 0) { caption = ''; }
        if (description === void 0) { description = ''; }
        var input = new FormData();
        input.append('url', fileToUpload);
        input.append('caption', caption);
        input.append('description', description);
        return this.makeRequest(this.imagesUrl, 'POST', input);
    };
    return UploadService;
}(common_service_1.CommonService));
exports.UploadService = UploadService;
//# sourceMappingURL=uploads.service.js.map