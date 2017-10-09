/**
 * Created by saruni on 5/25/17.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstitutionService } from '../common/services/institutions.service';


@Component({
  selector: 'institutions',
  templateUrl:  './institutions.component.html',
  styleUrls:  ['./institutions.component.css'],
  providers: [ InstitutionService ]
})

export class InstitutionComponent implements OnInit {
  errorMessage: string;
  mode = 'Observable';
  institutions: any[];
  constructor (
    private institutionService: InstitutionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getInstitutions()
  }

  getInstitutions() {
    this.institutionService.getInstitutions()
      .subscribe(
        institutions => this.institutions = institutions,
        error => this.errorMessage = <any>error);
  }

}



