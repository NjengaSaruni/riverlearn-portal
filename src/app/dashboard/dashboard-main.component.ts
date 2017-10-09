/**
 * Created by saruni on 8/19/17.
 */

import {AfterViewInit, Component, OnInit} from '@angular/core';


declare var $: any;

@Component({
  selector: 'dashboard-main',
  template: `
    <div>This is something</div>
  `
})

export class DashboardMainComponent implements OnInit, AfterViewInit {
  private contentReady: boolean = false;

  constructor(
  ) {}

  ngOnInit() {
    console.log('In component');
  }

  ngAfterViewInit(){
    this.contentReady = true;
  }
}
