import { Injectable } from '@angular/core';
import {Info} from "../../info";
import {CalendarEntry} from "../../calendar-entry";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import {SubjectsComponent} from "../../components/subjects/subjects.component";
import {Subject} from "../../subject";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  db: any;
  infos: Observable<Info[]>;
  calendar: Observable<CalendarEntry[]>;
  subjects: Observable<Subject[]>;
  currId: number = 0;

  constructor(db: AngularFirestore) {
    this.db = db;
    this.infos = this.db.collection("infos").valueChanges({idField: "id"});
    this.calendar = this.db.collection("calendar").valueChanges({idField: "id"});
    this.subjects = this.db.collection("subjects").valueChanges({idField: "id"});
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

  addSubject(name: string): void {
    this.db.collection("subjects").add({name: name, infos: []});
  }

  getSubjects(): Observable<Subject[]> {
    return this.subjects;
  }

  getSubject(id: string): Observable<Subject> {
    return this.db.collection("subjects").doc(id).valueChanges();
  }

  updateSubject(id: string, subject: Subject): void {
    this.db.collection("subjects").doc(id).update(subject);
  }

  deleteSubject(id: string): void {
    this.db.collection("subjects").doc(id).delete();
  }
}
