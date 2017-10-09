/**
 * Created by saruni on 4/10/17.
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
var platform_browser_1 = require("@angular/platform-browser");
var LandingPageComponent = (function () {
    function LandingPageComponent(titleService) {
        this.titleService = titleService;
    }
    LandingPageComponent.prototype.ngOnInit = function () {
        this.titleService.setTitle("RiverLearn - Home");
        $('#main_menu').transition('slide in');
        this.fnx();
    };
    LandingPageComponent.prototype.ngAfterViewInit = function () {
        $(document)
            .ready(function () {
            // fix menu when passed
            $('#intro_segment')
                .visibility({
                once: false,
                onBottomPassed: function () {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function () {
                    $('.fixed.menu').transition('fade out');
                }
            });
        });
    };
    LandingPageComponent.prototype.fnx = function () {
        $(document.body)
            .ready(function () {
            $("#DateCountdown").TimeCircles({
                "animation": "smooth",
                "bg_width": 0.2,
                "fg_width": 0.013333333333333334,
                "circle_bg_color": "#60686F",
                "time": {
                    "Days": {
                        "text": "Days",
                        "color": "#0e5a77",
                        "show": true
                    },
                    "Hours": {
                        "text": "Hours",
                        "color": "#0e5a77",
                        "show": true
                    },
                    "Minutes": {
                        "text": "Minutes",
                        "color": "#0e5a77",
                        "show": true
                    },
                    "Seconds": {
                        "text": "Seconds",
                        "color": "#0e5a77",
                        "show": true
                    }
                }
            });
        });
    };
    return LandingPageComponent;
}());
LandingPageComponent = __decorate([
    core_1.Component({
        selector: 'landing-page',
        templateUrl: './landingpage.component.html',
        styleUrls: ['./landingpage.component.css']
    }),
    __metadata("design:paramtypes", [platform_browser_1.Title])
], LandingPageComponent);
exports.LandingPageComponent = LandingPageComponent;
//# sourceMappingURL=landingpage.component.js.map