/**
 * Created by saruni on 8/18/17.
 */

import {Component, OnDestroy, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css' ]
})

export class ManagementComponent implements OnInit, OnDestroy {

  constructor(
  ) {}

  ngOnInit() {
    if ($('#items-menu').is(':visible')) {
      $('#items-menu').transition({
        animation: 'slide up',
        duration: 50
      })
    }
  }

  ngOnDestroy() {
    $('#items-menu').transition({
      animation: 'slide up',
      duration: 50
    })
  }
}

