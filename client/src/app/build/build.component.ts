import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
//import { colors } from '../demo-utils/colors';

@Component({
  selector: 'app-build',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent {

  BuildComponent() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var maxDate = new Date(year + 2, month, day);

    this.maxDate = maxDate;
  }

  colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3'
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF'
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA'
    }
  };

  //view: string = 'month';

  //viewDate: Date = new Date();

  //events: CalendarEvent[] = [];

  //refresh: Subject<any> = new Subject();

  //addEvent(date: Date): void {
  //  this.events.push({
  //    start: date,
  //    title: 'New event',
  //    color: this.colors.red
  //  });
  //  this.refresh.next();
  //}

  view: string = 'month';
  viewDate: Date = new Date();
  minDate: Date = new Date(this.viewDate);
  maxDate: Date;

  events: CalendarEvent[] = [
    {
      title: 'Draggable event',
      color: this.colors.yellow,
      start: new Date(),
      draggable: true
    },
    {
      title: 'A non draggable event',
      color: this.colors.blue,
      start: new Date()
    }
  ];

  refresh: Subject<any> = new Subject();

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
  }
}
