/**
 * Created by saruni on 8/13/17.
 */

import {Injectable} from '@angular/core';
import {URLSearchParams, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {CommonService} from './common.service';
import {
  Class, ClassRoom, InstitutionSubject, Level, Parent, Stream, Student,
  Teacher
} from '../models/divisions.models';
import {User} from '../models/users.models';

@Injectable()
export class DivisionService extends CommonService {
  private divisionsUrl = 'divisions/';
  private levelsUrl = this.divisionsUrl + 'levels/';
  private streamsUrl = this.divisionsUrl + 'streams/';
  private classesUrl = this.divisionsUrl + 'classes/';
  private studentsUrl = this.divisionsUrl + 'students/';
  private parentsUrl = this.divisionsUrl + 'parents/';
  private teachersUrl = this.divisionsUrl + 'teachers/';
  private subjectsUrl = this.divisionsUrl + 'subjects/';
  private classRoomsUrl = this.divisionsUrl + 'class_rooms/';

  getTeachers(): Observable<Teacher[]> {
    return this.makeRequest(this.teachersUrl, 'GET');
  }

  createTeacher(user: User = null, subjects: string[] = []): Observable<Response> {
    return this.makeRequest(this.teachersUrl, 'POST', { user, subjects});
  }

  getTeacher(id: string): Observable<Teacher> {
    id += '/';
    return this.makeRequest(this.teachersUrl + id, 'GET');
  }

  getParents(q: string = null): Observable<Parent[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('q', q);
    return this.makeRequest(this.parentsUrl, 'GET', null, params);
  }

  createParent(user: User = null, students: string[] = null, token: string = null): Observable<Response> {
    return this.makeRequest(this.parentsUrl, 'POST',{ user, students, token});
  }

  getParent(id: string): Observable<Parent> {
    id += '/';
    return this.makeRequest(this.parentsUrl + id , 'POST');
  }

  getStudents(q: string = null): Observable<Student[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('q', q);
    return this.makeRequest(this.studentsUrl, 'GET', null, params);
  }

  createStudent(user: User = null, current_class: string = null, registration_number: string = null, parent: string = null): Observable<Student> {
    return this.makeRequest(this.studentsUrl , 'POST' ,{ user, current_class, registration_number, parent});
  }

  getStudent(id: string): Observable<Student> {
    id += '/';
    return this.makeRequest(this.studentsUrl + id , 'GET');
  }

  getClasses(level: string = null): Observable<Class[]> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('level', level);
    return this.makeRequest(this.classesUrl, 'GET', null, params);
  }

  createClass(stream: string, level: string, class_teacher: string = null): Observable<Class> {
    return this.makeRequest(this.classesUrl, 'POST' , { stream, level, class_teacher});
  }

  getClass(id: string): Observable<Class> {
    id += '/';
    return this.makeRequest(this.classesUrl + id , 'GET');
  }

  getLevels(): Observable<Level[]> {
    return this.makeRequest(this.levelsUrl, 'GET');
  }

  createLevel(name: string, value: number): Observable<Response> {
    return this.makeRequest(this.levelsUrl, 'POST' ,{ name, value});
  }

  getLevel(id: string): Observable<Level> {
    id += '/';
    return this.makeRequest(this.levelsUrl + id , 'GET');
  }

  getStreams(): Observable<Stream[]> {
    return this.makeRequest(this.streamsUrl, 'GET');
  }

  createStream(name: string, color: string, description: string = ''): Observable<Stream> {
    return this.makeRequest(this.streamsUrl,'POST' , { name, description, color});
  }

  deleteStream(id: string): Observable<Stream> {
    id += '/';
    return this.makeRequest(this.streamsUrl + id, 'DELETE')
  }

  getStream(id: string): Observable<Level> {
    id += '/';
    return this.makeRequest(this.streamsUrl + id , 'GET');
  }

  getSubjects(): Observable<InstitutionSubject[]> {
    return this.makeRequest(this.subjectsUrl, 'GET');
  }

  createSubject(field: string, name: string): Observable<InstitutionSubject> {
    return this.makeRequest(this.subjectsUrl,'POST' , { name, field });
  }

  deleteSubject(id: string): Observable<Stream> {
    id += '/';
    return this.makeRequest(this.subjectsUrl + id, 'DELETE')
  }

  getSubject(id: string): Observable<InstitutionSubject> {
    id += '/';
    return this.makeRequest(this.subjectsUrl + id , 'GET');
  }

  getClassRooms(): Observable<ClassRoom[]> {
    return this.makeRequest(this.classRoomsUrl, 'GET');
  }

  createClassRoom(field: string, name: string): Observable<ClassRoom> {
    return this.makeRequest(this.classRoomsUrl,'POST' , { name, field });
  }

  deleteClassRoom(id: string): Observable<ClassRoom> {
    id += '/';
    return this.makeRequest(this.classRoomsUrl + id, 'DELETE')
  }

  getClassRoom(id: string): Observable<ClassRoom> {
    id += '/';
    return this.makeRequest(this.classRoomsUrl + id , 'GET');
  }

}
