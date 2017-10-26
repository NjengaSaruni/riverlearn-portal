/**
 * Created by saruni on 10/20/17.
 */

import { Component, OnInit} from '@angular/core';
import {ExamService} from "../../common/services/exams.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Exam} from "../../common/models/exams.models";
import {DivisionService} from "../../common/services/divisions.service";
import {Class, InstitutionSubject} from "../../common/models/divisions.models";

declare var $: any;

@Component({
  selector: 'exam-paper-form',
  templateUrl: './exam-paper-form-component.html',
  styleUrls: ['./exam-paper-form-component.css']
})
export class ExamPaperFormComponent implements OnInit {
  allClasses: Class[];
  classes: Class[];
  subjects: InstitutionSubject[];
  exams: Exam[];
  protected paperForm: FormGroup;

  constructor(
    private examService: ExamService,
    private divisionService: DivisionService,
    private formBuilder: FormBuilder,
  ){}

  ngOnInit(): void {
    $(document).ready(function () {
      $('.ui.dropdown').dropdown();

      $('.ui.calendar').calendar();
    });


    this.getExams();
    this.getSubjects();
    this.getClasses();

    this.paperForm = this.formBuilder.group({
      exam: ['', Validators.required],
      classes: ['', Validators.required ],
      subject: ['', Validators.required],
      start: [new Date(), Validators.required],
      duration: ['', Validators.required],
      total_mark: [100],
      csv_file: [''],
      location: [''],
    })

  }

  getExams(): void {
    this.examService.getExams()
      .subscribe(
        exams => {
          this.exams = exams;
        },
        error => alert(error)
      )
  }

  getSubjects(): void {
    this.divisionService.getSubjects()
      .subscribe(
        subjects => this.subjects = subjects,
        error => alert(error)
      )
  }

  getClasses(): void {
    this.divisionService.getClasses()
      .subscribe(
        classes => {
          this.classes = classes;
          this.allClasses = classes;
        },
        error => alert(error)
      )
  }

  onExamChange(event: any){
    this.paperForm.patchValue({classes: []});
    this.classes = this.allClasses;
    let exam = this.exams.find(exam => exam.id == this.paperForm.get('exam').value);
    this.classes = this.classes.filter(cls => {
      for(let level of exam.class_levels){
        return cls.level.id == level.id;
      }
    });
    console.log(this.paperForm.get('classes').value);
  }


}
