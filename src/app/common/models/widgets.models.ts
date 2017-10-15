/**
 * Created by saruni on 10/11/17.
 */
export class Appointment  {

  constructor(id?, description?, location?, subject?, calendar?, start?, end?){
    this.id = id;
    this.description = description;
    this.location = location;
    this.subject = subject;
    this.calendar = calendar;
    this.start = start;
    this.end = end;
  }
  id: string;
  description: string;
  location: string;
  subject: string;
  calendar: string;
  start: Date;
  end: Date;
}
