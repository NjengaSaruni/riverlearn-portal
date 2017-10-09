"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_models_1 = require("./common.models");
/**
 * Created by saruni on 4/9/17.
 */
var Permission = (function () {
    function Permission() {
    }
    return Permission;
}());
exports.Permission = Permission;
var Group = (function () {
    function Group() {
    }
    return Group;
}());
exports.Group = Group;
var Image = (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Image;
}(common_models_1.AbstractBase));
exports.Image = Image;
var AccountType = (function (_super) {
    __extends(AccountType, _super);
    function AccountType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AccountType;
}(common_models_1.AbstractBase));
exports.AccountType = AccountType;
var Profile = (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Profile;
}(common_models_1.AbstractBase));
exports.Profile = Profile;
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(common_models_1.AbstractBareBase));
exports.User = User;
var JoinRequest = (function (_super) {
    __extends(JoinRequest, _super);
    function JoinRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return JoinRequest;
}(common_models_1.AbstractBase));
exports.JoinRequest = JoinRequest;
var Token = (function (_super) {
    __extends(Token, _super);
    function Token() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Token;
}(common_models_1.AbstractBase));
exports.Token = Token;
//# sourceMappingURL=users.models.js.map