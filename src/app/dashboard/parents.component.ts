/**
 * Created by saruni on 9/18/17.
 */

import { Component, OnInit} from '@angular/core';
import { Parent } from '../common/models/divisions.models';
import { DivisionService } from '../common/services/divisions.service';

declare var $: any;

@Component({
  selector: 'parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css' ]
})

export class ParentsComponent implements OnInit {
  protected parents: Parent[];
  protected contentReady: boolean;
  protected searchTextEmpty: boolean;
  protected searchText: string;

  protected color = 'primary';
  protected mode = 'indeterminate';
  protected value = 50;
  protected bufferValue = 75;

  constructor(
    private divisionService: DivisionService
  ) {}

  ngOnInit() {
    $(document).ready(function () {
      $('.ui.accordion').accordion({
          duration: 1000
        }
      );

    });

    this.getParents();
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

