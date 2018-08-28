import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarMonthViewDay, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { Subject } from 'rxjs';
//import { colors } from '../demo-utils/colors';
import {
  subMonths,
  addMonths,
  addDays,
  addWeeks,
  subDays,
  subWeeks,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay
} from 'date-fns';

type CalendarPeriod = 'day' | 'week' | 'month';

function addPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: addDays,
    week: addWeeks,
    month: addMonths
  }[period](date, amount);
}

function subPeriod(period: CalendarPeriod, date: Date, amount: number): Date {
  return {
    day: subDays,
    week: subWeeks,
    month: subMonths
  }[period](date, amount);
}

function startOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: startOfDay,
    week: startOfWeek,
    month: startOfMonth
  }[period](date);
}

function endOfPeriod(period: CalendarPeriod, date: Date): Date {
  return {
    day: endOfDay,
    week: endOfWeek,
    month: endOfMonth
  }[period](date);
}

@Component({
  selector: 'app-build',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent {

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

  constructor() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var maxDate = new Date(year + 2, month, day);

    this.maxDate = maxDate;

    this.dateOrViewChanged();
  }



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

  view: CalendarPeriod = 'month';
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

  prevBtnDisabled: boolean = false;

  nextBtnDisabled: boolean = false;

  increment(): void {
    this.changeDate(addPeriod(this.view, this.viewDate, 1));
  }

  decrement(): void {
    this.changeDate(subPeriod(this.view, this.viewDate, 1));
  }

  today(): void {
    this.changeDate(new Date());
  }

  dateIsValid(date: Date): boolean {
    return date >= this.minDate && date <= this.maxDate;
  }

  changeDate(date: Date): void {
    this.viewDate = date;
    this.dateOrViewChanged();
  }

  changeView(view: CalendarPeriod): void {
    this.view = view;
    this.dateOrViewChanged();
  }

  dateOrViewChanged(): void {
    this.prevBtnDisabled = !this.dateIsValid(
      endOfPeriod(this.view, subPeriod(this.view, this.viewDate, 1))
    );
    this.nextBtnDisabled = !this.dateIsValid(
      startOfPeriod(this.view, addPeriod(this.view, this.viewDate, 1))
    );
    if (this.viewDate < this.minDate) {
      this.changeDate(this.minDate);
    } else if (this.viewDate > this.maxDate) {
      this.changeDate(this.maxDate);
    }
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach(day => {
      if (!this.dateIsValid(day.date)) {
        day.cssClass = 'cal-disabled';
      }
    });
  }

}
