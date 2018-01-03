/**
 * Created by saruni on 1/2/18.
 */

import {Component, OnInit} from "@angular/core";
import {DivisionService} from "../../common/services/divisions.service";
import {MatSnackBar} from "@angular/material";
import {Student} from "../../common/models/divisions.models";

declare var $: any;

@Component({
  selector: 'student-line-graph',
  templateUrl: './student-line-graph.component.html',
  styleUrls: ['./student-line-graph.component.css'],
})
export class StudentLineGraphComponent implements OnInit {
  students: Student[];

  constructor(
    private divisionService: DivisionService,
    public snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.getStudents();

  }

  getStudents(): void {
    this.divisionService.getStudents()
      .subscribe(
        students => this.students = students,
        error => this.openSnackBar(error)
      )
  }

  toggleDropdown(): void {
    $('#students-search-dropdown').dropdown('toggle');
  }

  openSnackBar(message? : string, duration: number = 3000) {
    this.snackBar.open(message, 'Dismiss' ,{
      duration: duration
    });
  }
}
