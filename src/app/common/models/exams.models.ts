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

export class StudentPaperPerformance extends AbstractBase{
  student: Student;
  paper: ExamPaper;
  mark: number;
}

export class Result extends AbstractBase {
  student_paper_performances: StudentPaperPerformance[];
  comments: _Comment[];
}
