/**
 * Created by saruni on 5/18/17.
 */


/**
 * Created by saruni on 4/9/17.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './book.service';


@Component({
  selector: 'books',
  templateUrl:  './book-list.component.html',
  styleUrls:  ['./book-list.component.css'],
  providers: [ BookService ]
})

export class BooksComponent implements OnInit {
  errorMessage: string;
  mode = 'Observable';
  books: any[];
  files: any[];
  constructor (
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBooks()
  }

  getBooks() {
    this.bookService.getBooks()
      .subscribe(
        books => this.books = books,
        error => this.errorMessage = <any>error);
  }

}



