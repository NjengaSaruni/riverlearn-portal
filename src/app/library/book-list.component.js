/**
 * Created by saruni on 5/18/17.
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
/**
 * Created by saruni on 4/9/17.
 */
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var book_service_1 = require("./book.service");
var BooksComponent = (function () {
    function BooksComponent(bookService, router) {
        this.bookService = bookService;
        this.router = router;
        this.mode = 'Observable';
    }
    BooksComponent.prototype.ngOnInit = function () {
        this.getBooks();
    };
    BooksComponent.prototype.getBooks = function () {
        var _this = this;
        this.bookService.getBooks()
            .subscribe(function (books) { return _this.books = books; }, function (error) { return _this.errorMessage = error; });
    };
    return BooksComponent;
}());
BooksComponent = __decorate([
    core_1.Component({
        selector: 'books',
        templateUrl: './book-list.component.html',
        styleUrls: ['./book-list.component.css'],
        providers: [book_service_1.BookService]
    }),
    __metadata("design:paramtypes", [book_service_1.BookService,
        router_1.Router])
], BooksComponent);
exports.BooksComponent = BooksComponent;
//# sourceMappingURL=book-list.component.js.map