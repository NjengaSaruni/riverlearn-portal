/**
 * Created by saruni on 5/25/17.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Institution, InstitutionType} from '../models/institutions.models';
import {CommonService} from './common.service';

@Injectable()
export class InstitutionService extends CommonService{
  private institutionsUrl =  'institutions/';
  private institutionTypesUrl = this.institutionsUrl + 'types/';

  getInstitutions(): Observable<Institution[]> {
    return this.makeRequest(this.institutionsUrl, 'GET');
  }

  getInstitution(id: string): Observable<Institution> {
    id += '/';
    return this.makeRequest(this.institutionsUrl + id , 'GET');
  }

  createInstitution(name: string = '', motto: string = '' , mobile: string = '', email: string = '',
                    website: string = '', postal_address: string = '', type: string = '', domain: string = '', logo: any = null
  ) {
    let input = new FormData();
    input.append('name', name);
    input.append('motto', motto);
    input.append('mobile', mobile);
    input.append('email', email);
    input.append('website', website);
    input.append('postal_address', postal_address)
    input.append('type', type);
    input.append('domain', domain);
    input.append('logo', logo);

    return this.makeRequest(this.institutionsUrl, 'POST', input);
  }

  getInstitutionTypes(): Observable<InstitutionType[]> {
    return this.makeRequest(this.institutionTypesUrl, 'GET')
  }

}
