/**
 * Created by saruni on 7/21/17.
 */

import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: [
    './terms-and-conditions.component.css'
  ]
})

export class TermsAndConditionsComponent implements OnInit{
  ngOnInit() {
    $('.ui.modal').modal()
  }
}
