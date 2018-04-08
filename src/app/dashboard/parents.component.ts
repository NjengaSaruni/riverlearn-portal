/**
 * Created by saruni on 9/18/17.
 */

import { Component, OnInit} from '@angular/core';
import { Parent } from '../common/models/divisions.models';
import { DivisionService } from '../common/services/divisions.service';
import {UserService} from "../common/services/user.service";
import {User} from "../common/models/users.models";

declare var $: any;

@Component({
  selector: 'parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css' ]
})

export class ParentsComponent implements OnInit {
  public parents: Parent[];
  public contentReady: boolean;
  public searchTextEmpty: boolean;
  public searchText: string;

  public color = 'primary';
  public mode = 'indeterminate';
  public value = 50;
  public bufferValue = 75;
  public user: User;

  constructor(
    public divisionService: DivisionService,
    public userService: UserService
  ) {
    this.getParents();
    this.getUser();
  }

  ngOnInit() {
    $(document).ready(function () {
      $('.ui.accordion').accordion({
          duration: 1000
        }
      );
    });
  }

  getUser(): void {
    this.userService.getLoggedInUser()
      .subscribe(
        user => this.user = user,
        error => alert(error)
      )
  }

  getParents(): void {
    this.divisionService.getParents()
      .subscribe(
        parents => {
          this.contentReady = true;
          this.parents = parents;
        },
        error => alert(error)
      )
  }

  searchParents(event: any) {
    this.searchTextEmpty = false;
    if(this.searchText !== '' || this.searchText === null)
    {
      this.contentReady = false;
      this.divisionService.getParents(this.searchText)
        .subscribe(
          parents => {
            this.contentReady = true;
            this.parents = parents;
          },
          error => alert(error)
        );
    }
    else {
      this.searchTextEmpty = true;
    }

  }

  hideCards() {
    this.getParents();
    $('.dimmable.segment').transition({
      animation: 'slide',
      duration: 1000,
    })
  }
}

