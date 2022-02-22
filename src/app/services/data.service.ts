import { Injectable } from '@angular/core';
import {Info} from "../info";
import {CalendarEntry} from "../calendar-entry";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  db: any;
  infos: Observable<Info[]>;
  calendar: Observable<CalendarEntry[]>;
  currId: number = 0;

  constructor(db: AngularFirestore) {
    this.db = db;
    this.infos = this.db.collection("infos").valueChanges({idField: "id"});
    this.calendar = this.db.collection("calendar").valueChanges({idField: "id"});
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
    this.db.collection("calendar").add({date: new Date(date), content: content});
  }

  deleteCalendarEntry(id: string) {
    this.db.collection("calendar").doc(id).delete();
  }

  getCalendar(): Observable<CalendarEntry[]> {
    return this.calendar;
  }
}
