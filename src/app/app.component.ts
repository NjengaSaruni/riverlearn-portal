/**
 * Created by saruni on 4/5/17.
 */
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import { jqxBarGaugeComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxbargauge';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit, AfterViewInit {
  loggedIn: boolean = false;
  values: number[] = [102, 115, 130, 137];

  public constructor(
    private titleService: Title,
    private router: Router,
  ) { }

  public setTitle(newTitle: string = "Welcome to RiverLearn Inc") {
    this.titleService.setTitle(newTitle);
  }

  ngAfterViewInit() {
    // show dropdown on hover
    $('.pointing.menu  .ui.dropdown').dropdown({
      on: 'hover'
    });

    // fix menu when passed
    $('#masthead')
      .visibility({
        once: false,
        onBottomPassed: function() {
          alert("Bottom passed");
          $('.fixed.menu').transition('fade in');
        },
        onBottomPassedReverse: function() {
          $('.fixed.menu').transition('fade out');
        }
      })
    ;
    // create sidebar and attach to menu open
    $('.ui.sidebar')
      .sidebar('attach events', '.toc.item')
    ;
  }

  ngOnInit(): void{
    this.setTitle();
  }

  onUserCreateAccount(event: any) {
    this.router.navigate(['dashboard']);
  }

  onUserLoggedIn(event: any) {
    this.router.navigate(['dashboard'])
  }

  hideModals() {
    $('#loginModal').
    transition('slide out');
  }

  toggleLoginModal() {
    this.closeSidebarMenu();
    if ($('#registerModal').is(':visible')) {
      $('#registerModal').transition('fly left');
    }
    if ($('#loginModal').is(':visible')){
      $('#loginModal').transition('pulse');
    } else {
      $('#loginModal')
        .modal('show');
      $('html, body').animate({
        scrollTop: $('.pusher').offset().top
      }, 'slow');
    }
  }

  toggleRegisterModal() {
    this.closeSidebarMenu();
    if ($('#loginModal').is(':visible')) {
      $('#loginModal').transition('fly right');
    }
    if ($('#registerModal').is(':visible')) {
      $('#registerModal').transition('pulse');
    } else {
      $('#registerModal')
        .modal('show', {'transition': 'slide in'});
      $('html, body').animate({
        scrollTop: $('.pusher').offset().top
      }, 'slow');
    }
  }

  closeSidebarMenu(){
    if ($('.sidebar.menu').is(':visible')) {
      $('.sidebar.menu').transition('slide out');
    }
  }

  close() {
    console.log("Clicked outside");
    $('#registerModal').
    transition('slide right');
    $('#loginModal').
    transition('slide right');
  }

}
