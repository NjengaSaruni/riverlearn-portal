/**
 * Created by saruni on 8/13/17.
 */

import {_Comment, AbstractBase, Subject} from './common.models';
import {Class, ClassRoom, Level, Student} from './divisions.models';

export class Exam extends AbstractBase {
  name: string;
  number: string;
  class_levels: Level[];
  notes: string;
  start_date: Date;
  end_date: Date;
  done: boolean;
  selected: boolean;
  papers: ExamPaper[];
}

export class ExamPaper extends AbstractBase {
  exam: Exam;
  subject: Subject;
  start: Date;
  end: Date;
  duration: string;
  total_mark: number;
  url: string;
  location: ClassRoom;
  classes: Class;
}

export class Grade extends AbstractBase {
  name: string;
  ceiling: number;
  floor: number;
}

export class StudentPaperPerformance extends AbstractBase{
  student: Student;
  paper: ExamPaper;
  mark: number;
  grade: Grade;
  class_performance: ClassExamPaperPerformance;
  comments: _Comment[];
}

export class ClassExamPaperPerformance extends AbstractBase {
  class_result: ClassExamResult;
  paper: ExamPaper;
  comments: _Comment[];
  student_performances: StudentPaperPerformance[];
}

export class ClassExamResult extends AbstractBase {
  exam: Exam;
  _class: Class;
  paper_performances: ClassExamPaperPerformance[];
  comments: _Comment[];
}
