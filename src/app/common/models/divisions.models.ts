
import {AbstractBase, Color, Subject} from './common.models';
import {User} from './users.models';
/**
 * Created by saruni on 8/13/17.
 */

export class Level extends AbstractBase
{
  name: string;
  value: number;
}

export class Stream extends AbstractBase
{
  name: string;
  description: string;
  color: Color;
}

export class Class extends AbstractBase
{
  name: string;
  level: Level;
  stream: Stream;
  class_teacher: Teacher;
  year: number;
}

export class Student extends AbstractBase{
  registration_number: string;
  user: User;
  current_class: Class;
  parent: Parent;
}

export class Parent extends AbstractBase{
  token: string;
  user: User;
  students: Student[];
}

export class Teacher extends AbstractBase {
  user: User;
  subjects: InstitutionSubject[];
  classes: Class[];
}


export class InstitutionSubject extends AbstractBase {
  subject: Subject;
}
