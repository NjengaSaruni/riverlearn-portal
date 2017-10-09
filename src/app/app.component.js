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
/**
 * Created by saruni on 4/5/17.
 */
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(titleService, router) {
        this.titleService = titleService;
        this.router = router;
        this.loggedIn = false;
        this.values = [102, 115, 130, 137];
    }
    AppComponent.prototype.setTitle = function (newTitle) {
        if (newTitle === void 0) { newTitle = "Welcome to RiverLearn Inc"; }
        this.titleService.setTitle(newTitle);
    };
    AppComponent.prototype.ngAfterViewInit = function () {
        // show dropdown on hover
        $('.pointing.menu  .ui.dropdown').dropdown({
            on: 'hover'
        });
        // fix menu when passed
        $('#masthead')
            .visibility({
            once: false,
            onBottomPassed: function () {
                alert("Bottom passed");
                $('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function () {
                $('.fixed.menu').transition('fade out');
            }
        });
        // create sidebar and attach to menu open
        $('.ui.sidebar')
            .sidebar('attach events', '.toc.item');
    };
    AppComponent.prototype.ngOnInit = function () {
        this.setTitle();
    };
    AppComponent.prototype.onUserCreateAccount = function (event) {
        this.router.navigate(['dashboard']);
    };
    AppComponent.prototype.onUserLoggedIn = function (event) {
        this.router.navigate(['dashboard']);
    };
    AppComponent.prototype.hideModals = function () {
        $('#loginModal').
            transition('slide out');
    };
    AppComponent.prototype.toggleLoginModal = function () {
        this.closeSidebarMenu();
        if ($('#registerModal').is(':visible')) {
            $('#registerModal').transition('fly left');
        }
        if ($('#loginModal').is(':visible')) {
            $('#loginModal').transition('pulse');
        }
        else {
            $('#loginModal')
                .modal('show');
            $('html, body').animate({
                scrollTop: $('.pusher').offset().top
            }, 'slow');
        }
    };
    AppComponent.prototype.toggleRegisterModal = function () {
        this.closeSidebarMenu();
        if ($('#loginModal').is(':visible')) {
            $('#loginModal').transition('fly right');
        }
        if ($('#registerModal').is(':visible')) {
            $('#registerModal').transition('pulse');
        }
        else {
            $('#registerModal')
                .modal('show', { 'transition': 'slide in' });
            $('html, body').animate({
                scrollTop: $('.pusher').offset().top
            }, 'slow');
        }
    };
    AppComponent.prototype.closeSidebarMenu = function () {
        if ($('.sidebar.menu').is(':visible')) {
            $('.sidebar.menu').transition('slide out');
        }
    };
    AppComponent.prototype.close = function () {
        console.log("Clicked outside");
        $('#registerModal').
            transition('slide right');
        $('#loginModal').
            transition('slide right');
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.css']
    }),
    __metadata("design:paramtypes", [platform_browser_1.Title,
        router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map