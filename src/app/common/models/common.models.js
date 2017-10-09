/**
 * Created by saruni on 8/13/17.
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AbstractBareBase = (function () {
    function AbstractBareBase() {
    }
    return AbstractBareBase;
}());
exports.AbstractBareBase = AbstractBareBase;
var AbstractBase = (function (_super) {
    __extends(AbstractBase, _super);
    function AbstractBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbstractBase;
}(AbstractBareBase));
exports.AbstractBase = AbstractBase;
var Subject = (function (_super) {
    __extends(Subject, _super);
    function Subject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Subject;
}(AbstractBase));
exports.Subject = Subject;
var _Comment = (function (_super) {
    __extends(_Comment, _super);
    function _Comment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return _Comment;
}(AbstractBase));
exports._Comment = _Comment;
var Color = (function () {
    function Color() {
    }
    return Color;
}());
exports.Color = Color;
//# sourceMappingURL=common.models.js.map