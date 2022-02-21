import { Injectable } from '@angular/core';
import {Info} from "../info";
import {CalendarEntry} from "../calendar-entry";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  infos: Info[] = [];
  calendar: CalendarEntry[] = [];
  currId: number = 0;

  constructor() { }

  addInfo(newInfo: string): void {
    this.infos.push({id: this.currId, text: newInfo});
    this.currId++;
  }

  addCalendarEntry(content: string, date: string) {
    this.calendar.push({id: this.currId, date: new Date(date), content: content});
    this.calendar.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  getInfo(): Info[] {
    return this.infos;
  }

  getCalendar(): CalendarEntry[] {
    return this.calendar;
  }
}
