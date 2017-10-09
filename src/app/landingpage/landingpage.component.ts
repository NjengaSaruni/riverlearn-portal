/**
 * Created by saruni on 4/10/17.
 */

import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'landing-page',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css' ]
})

export class LandingPageComponent implements OnInit, AfterViewInit{

  constructor(
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle("RiverLearn - Home");
    $('#main_menu').transition('slide in');
    this.fnx();
  }

  ngAfterViewInit() {
    $(document)
      .ready(function() {
        // fix menu when passed
        $('#intro_segment')
          .visibility({
            once: false,
            onBottomPassed: function() {
              $('.fixed.menu').transition('fade in');
            },
            onBottomPassedReverse: function() {
              $('.fixed.menu').transition('fade out');
            }
          })
        ;
      })
    ;
  }

  fnx(){
    $(document.body)
      .ready(function() {
        $("#DateCountdown").TimeCircles({
          "animation": "smooth",
          "bg_width": 0.2,
          "fg_width": 0.013333333333333334,
          "circle_bg_color": "#60686F",
          "time": {
            "Days": {
              "text": "Days",
              "color": "#0e5a77",
              "show": true
            },
            "Hours": {
              "text": "Hours",
              "color": "#0e5a77",
              "show": true
            },
            "Minutes": {
              "text": "Minutes",
              "color": "#0e5a77",
              "show": true
            },
            "Seconds": {
              "text": "Seconds",
              "color": "#0e5a77",
              "show": true
            }
          }
        });
      })
    ;
  }
}

