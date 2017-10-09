/**
 * Created by saruni on 8/18/17.
 */

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {delay} from '../common/services/common.service';


declare var $: any;

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css' ]
})

export class FeedComponent implements OnInit, AfterViewInit {
  private contentReady: boolean = false;

  constructor(
  ) {}

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.contentReady = true;
  }

}

