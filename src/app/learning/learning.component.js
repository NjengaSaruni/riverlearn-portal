/**
 * Created by saruni on 7/11/17.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var LearningComponent = (function () {
    function LearningComponent() {
        this.size = "40";
        this.sizeChange = new core_1.EventEmitter();
    }
    LearningComponent.prototype.dec = function () { this.resize(-1); };
    LearningComponent.prototype.inc = function () { this.resize(+1); };
    LearningComponent.prototype.resize = function (delta) {
        this.size = Math.min(40, Math.max(8, +this.size + delta));
        this.sizeChange.emit(this.size);
    };
    return LearningComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LearningComponent.prototype, "size", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], LearningComponent.prototype, "sizeChange", void 0);
LearningComponent = __decorate([
    core_1.Component({
        selector: 'learning',
        template: "\n    <div>\n      <button (click)=\"dec()\" title=\"smaller\">-</button>\n      <button (click)=\"inc()\" title=\"bigger\">+</button>\n      <label [style.font-size.px]=\"size\">FontSize: {{size}}px</label>\n    </div>"
    })
], LearningComponent);
exports.LearningComponent = LearningComponent;
//# sourceMappingURL=learning.component.js.map