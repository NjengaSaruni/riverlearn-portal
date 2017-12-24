/**
 * Created by saruni on 8/13/17.
 */

import {Injectable} from '@angular/core';
import {URLSearchParams, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {CommonService} from './common.service';
import {
  ClassExamPaperPerformance, ClassExamResult, Exam, ExamPaper,
  StudentPaperPerformance
} from '../models/exams.models';
import {Subject} from '../models/common.models';
import DateTimeFormat = Intl.DateTimeFormat;

@Injectable()
export class ExamService extends CommonService {
  private examsUrl = 'exams/';
  private examPapersUrl = this.examsUrl + 'papers/';
  private examResultsUrl = this.examsUrl + 'results/';
  private classPaperPerformancesUrl = this.examsUrl + 'class_paper_performances/';
  private studentPaperPerformancesUrl = this.examsUrl + 'student_paper_performances/';

  getExamResults(exam?: string, _class?: string, q?: string): Observable<ClassExamResult[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('q', q);
    params.set('_class', _class);
    params.set('exam', exam);
    return this.makeRequest(this.examResultsUrl, 'GET', null, params)
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

  getExamResult(id: string): Observable<ClassExamResult> {
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
    csv_file: any = null,
    location: string = null
  ): Observable<ExamPaper> {

    let input = new FormData();
    input.append('exam', exam);
    input.append('subject', subject);
    input.append('start', start_time);
    input.append('duration', duration);
    input.append('total_mark', total_mark);
    input.append('url', csv_file);
    input.append('location', location);

    return this.makeRequest(this.examPapersUrl,'POST' , input);

  }

  patchExamPaper(paper: string, classes?: string[]){
    paper += '/';
    return this.makeRequest(this.examPapersUrl + paper, 'PATCH', {classes})
  }

  getExamPaper(id: string): Observable<ExamPaper> {
    id += '/';
    return this.makeRequest(this.examPapersUrl + id, 'GET');
  }

  getExams(q: string = null): Observable<Exam[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('q', q);
    return this.makeRequest(this.examsUrl, 'GET', null, params);
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


  getClassExamPaperPerformances(paper: string = null, q: string = null): Observable<ClassExamPaperPerformance[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('q', q);
    params.set('paper', paper);
    return this.makeRequest(this.classPaperPerformancesUrl, 'GET', null, params);
  }

  getClassExamPaperPerformance(id: string): Observable<ClassExamPaperPerformance> {
    id += '/';
    return this.makeRequest(this.classPaperPerformancesUrl + id, 'GET');
  }

  patchStudentPaperPerformance(id: string, mark: number): Observable<StudentPaperPerformance> {
    id += '/';
    return this.makeRequest(this.studentPaperPerformancesUrl + id, 'PATCH', {id, mark});
  }

}

