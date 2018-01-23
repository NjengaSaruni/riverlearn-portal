import {AbstractBase} from "./common.models";
import {InstitutionSubject, Student} from "./divisions.models";

export class StudentPrediction extends AbstractBase {
  student: Student;
  subject: InstitutionSubject;
  average: number;
  used_to_train: number;
  predicted: number;
}
