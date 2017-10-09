/**
 * Created by saruni on 8/27/17.
 */

import { AfterViewInit, Component, OnInit } from '@angular/core';


declare var $: any;

@Component({
  selector: 'subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css' ]
})

export class SubjectFormComponent implements OnInit, AfterViewInit {
  private contentReady: boolean = false;

  constructor(
  ) {}

  ngOnInit() {
    $(document).ready(
      $('.ui.dropdown').dropdown()
    )
  }

  ngAfterViewInit(){
    this.contentReady = true;
  }

}
