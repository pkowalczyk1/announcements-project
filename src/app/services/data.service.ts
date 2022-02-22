import { Injectable } from '@angular/core';
import {Info} from "../info";
import {CalendarEntry} from "../calendar-entry";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  db: any;
  infos: Observable<Info[]>;
  calendar: CalendarEntry[] = [];
  currId: number = 0;

  constructor(db: AngularFirestore) {
    this.db = db;
    this.infos = this.db.collection('infos').valueChanges({idField: "id"});
  }

  addInfo(newInfo: string): void {
    this.db.collection("infos").add({text: newInfo})
  }

  deleteInfo(id: string): void {
    this.db.collection("infos").doc(id).delete();
  }

  getInfo(): Observable<Info[]> {
    return this.infos;
  }

  addCalendarEntry(content: string, date: string) {
    this.calendar.push({id: this.currId, date: new Date(date), content: content});
    this.calendar.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  getCalendar(): CalendarEntry[] {
    return this.calendar;
  }
}
