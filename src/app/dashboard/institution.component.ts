/**
 * Created by saruni on 8/29/17.
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../common/models/users.models';
import {UserService} from '../common/services/user.service';
import {Institution} from '../common/models/institutions.models';
import {InstitutionSubject, Stream} from '../common/models/divisions.models';
import {DivisionService} from '../common/services/divisions.service';
import {Color, Subject} from '../common/models/common.models';
import {CommonService, delay} from '../common/services/common.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'institution',
  templateUrl: './institution.component.html',
  styleUrls: ['./institution.component.css' ]
})

export class InstitutionComponent implements OnInit, OnDestroy {
  streamForm: FormGroup;
  subjectForm: FormGroup;
  user: User;
  institution: Institution;
  errorMessage: string;
  streams: Stream[];
  colors: Color[];
  fields: Subject[];
  subjects: InstitutionSubject[];

  selectedField: Subject;
  selectedColor: Color;

  constructor(
    private userService: UserService,
    private divisionService: DivisionService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
  ) {}


  ngOnInit() {
    this.streamForm = this.formBuilder.group({
        name: ['', Validators.required],
      });

    this.subjectForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    $('.ui.dropdown').dropdown();
    $('#addStreamButton')
      .popup({
        on    : 'click',
        inline: true,
        hoverable  : true,
        position   : 'bottom left',
        delay: {
          show: 300,
          hide: 800
        }
      })
    ;

    $('#addSubjectButton')
      .popup({
        on    : 'click',
        inline: true,
        hoverable  : true,
        position   : 'bottom left',
        delay: {
          show: 300,
          hide: 800
        }
      })
    ;

    this.getUser();
    this.getStreams();
    this.getColors();
    this.getSubjects();
    this.getFields();
  }

  ngOnDestroy() {

  }

  getUser(): void {
    this.userService.getLoggedInUser()
      .subscribe(
        user => this.user = user,
        error => this.errorMessage = <any>error);
  }

  getStreams(): void {
    this.divisionService.getStreams()
      .subscribe(
        streams => this.streams = streams,
        error => this.errorMessage = error
      )
  }

  getColors(): void {
    this.commonService.getColors()
      .subscribe(
        colors => this.colors = colors,
        error => this.errorMessage = error
      )
  }

  getSubjects(): void {
    this.divisionService.getSubjects()
      .subscribe(
        subjects => this.subjects = subjects,
        error => this.errorMessage = error
      )
  }

  getFields(): void {
    this.commonService.getFields()
      .subscribe(
        fields => this.fields = fields,
        error => this.errorMessage = error
      )
  }

  onSelectColor(event: any, color: Color){
    this.selectedColor = color;
    $('#colors-modal').transition({
      animation: 'slide out'
    })
  }

  onSelectField(event: any, field: Subject){
    this.selectedField = field;
  }

  setBorderColor(stream: Stream){
    if(stream.color){
      return {
        'border-bottom': '15px solid ' + stream.color.hex,
      };
    }
  }

  createStream(): void {
    let name = this.streamForm.get('name').value;
    let color: string = null;
    if(this.selectedColor){
      color = this.selectedColor.id.toString();
    }
    this.divisionService.createStream(name, color)
      .subscribe(
        stream => {
          this.getStreams();
          $('#streamsLength').transition('jiggle');
          this.streams.push(stream);
        },
        error => this.errorMessage = error,
        () => {
          this.streamForm.setValue({name: ''});
          $('#addStreamPopup').transition('slide up');
        }
      );
  }

  async deleteStream(event: any, stream: Stream) {
    $(event.target || event.srcElement).parents('tr').transition(
      {
        animation: 'fly left',
        duration: 2000
      }
    );
    await delay(1000);
    this.divisionService.deleteStream(stream.id.toString())
      .subscribe(
        stream => {
          for(let index in this.streams) {
            if(this.streams[index].id == stream.id){
              delete this.streams[index];
              break;
            }
          }
        },
        error => this.errorMessage = error,
        () => this.getStreams()
      )
  }

  patchStream(){
    // TODO create patching code
  }

  createSubject(): void {
    let name = this.subjectForm.get('name').value;
    let field: string = null;
    if(this.selectedField !== null){
      field = this.selectedField.id.toString();
    }
    this.divisionService.createSubject(field, name)
      .subscribe(
        subject => {
          this.getSubjects();
          $('#subjectsLength').transition('jiggle');
          this.subjects.push(subject);
        },
        error => this.errorMessage = error,
        () => {
          this.subjectForm.setValue({name: ''});
          $('#addSubjectPopup').transition('slide up');
        }
      );
  }

  async deleteSubject(event: any, subject: Subject) {
    $(event.target || event.srcElement).parents('tr').transition(
      {
        animation: 'fly left',
        duration: 2000
      });
    await delay(1000);
    this.divisionService.deleteSubject(subject.id.toString())
      .subscribe(
        subject => {
          for(let index in this.subjects) {
            if(this.subjects[index].id == subject.id){
              delete this.subjects[index];
              break;
            }
          }
        },
        error => this.errorMessage = error,
        () => this.getSubjects()
      )
  }



  toggleStreamsModal(){
    $('#streamsModal').modal('toggle')
  }

  toggleSubjectsModal(){
    $('#subjectsModal').modal('toggle')
  }

}
