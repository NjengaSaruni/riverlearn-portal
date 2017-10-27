/**
 * Created by saruni on 8/13/17.
 */

import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {CommonService, extractData, handleError, localUrl, onlineUrl, useLocal} from './common.service';
import {Level} from '../models/divisions.models';
import {Exam, ExamPaper, Result} from '../models/exams.models';
import {Subject} from '../models/common.models';
import DateTimeFormat = Intl.DateTimeFormat;

@Injectable()
export class ExamService extends CommonService {
  private examsUrl = 'exams/';
  private examPapersUrl = this.examsUrl + 'papers/';
  private examResultsUrl = this.examsUrl + 'papers/';

  getExamResults(): Observable<Result[]> {
    return this.makeRequest(this.examResultsUrl, 'GET')
  }

  createExamResult(
    exam: Exam = null,
    subject: Subject = null,
    start_time: DateTimeFormat = null,
    duration: number,
    total_mark: number,
    csv_file: File = null
  ): Observable<Response> {
    return this.makeRequest(this.examResultsUrl,'POST' ,{exam, subject, start_time, duration, total_mark, csv_file});
  }

  getExamResult(id: string): Observable<Result> {
    id += '/';
    return this.makeRequest(this.examResultsUrl + id, 'GET')
  }

  getExamPapers(): Observable<ExamPaper[]> {
    return this.makeRequest(this.examPapersUrl, 'GET')
  }

  createExamPaper(
    exam: string = null,
    subject: string = null,
    start_time: string = null,
    duration: string = null,
    total_mark: string = null,
    classes = null,
    csv_file: any = null
  ): Observable<Response> {

    let input = new FormData();
    input.append('exam', exam);
    input.append('subject', subject);
    input.append('start_time', start_time);
    input.append('duration', duration);
    input.append('total_mark', total_mark);
    input.append('classes', classes);
    input.append('csv_file', csv_file);
    return this.makeRequest(this.examPapersUrl,'POST' , input);
  }

  getExamPaper(id: string): Observable<ExamPaper> {
    id += '/';
    return this.makeRequest(this.examPapersUrl + id, 'GET');
  }

  getExams(): Observable<Exam[]> {
    return this.makeRequest(this.examsUrl, 'GET');
  }

  createExam(
    name: string = null,
    class_levels: string[] = null,
    notes: string = null,
    start_date: string = null,
    end_date: string = null,
  ): Observable<Response> {
    return this.makeRequest(this.examsUrl, 'POST', {name, class_levels, notes, start_date, end_date});
  }

  getExam(id: string): Observable<Exam> {
    id += '/';
    return this.makeRequest(this.examsUrl + id, 'GET');
  }
}

