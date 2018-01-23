import {ChangeDetectorRef, Pipe} from "@angular/core";
import {AsyncPipe} from "@angular/common";
import {Observable} from "rxjs";
/**
 * Created by saruni on 8/26/17.
 */

export function capitalize(str: string): string {
  return str.replace(/\b(\w)/g, s => s.toUpperCase());
}

@Pipe({
  name: 'messageTime',
  pure: false
})
export class MessageTimePipe extends AsyncPipe
{
  value:Date;
  timer:Observable<string>;

  constructor(ref:ChangeDetectorRef)
  {
    super(ref);
  }

  transform(obj:any, args?:any[]):any
  {
    if (obj instanceof Date)
    {
      this.value = obj;

      if(!this.timer)
      {
        this.timer = this.getObservable();
      }

      return super.transform(this.timer);
    }

    return super.transform(obj);
  }

  private getObservable()
  {
    return Observable.interval(1000).startWith(0).map(()=>
    {
      var result:string;
      // current time
      let now = new Date().getTime();

      // time since message was sent in seconds
      let delta = (now - this.value.getTime()) / 1000;

      // format string
      if (delta < 10)
      {
        result = 'jetzt';
      }
      else if (delta < 60)
      { // sent in last minute
        result = 'vor ' + Math.floor(delta) + ' Sekunden';
      }
      else if (delta < 3600)
      { // sent in last hour
        result = 'vor ' + Math.floor(delta / 60) + ' Minuten';
      }
      else if (delta < 86400)
      { // sent on last day
        result = 'vor ' + Math.floor(delta / 3600) + ' Stunden';
      }
      else
      { // sent more than one day ago
        result = 'vor ' + Math.floor(delta / 86400) + ' Tagen';
      }
      return result;
    });
  };
}
