import { Component, OnInit } from '@angular/core';
import {CalendarEntry} from "../../calendar-entry";
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  calendar: CalendarEntry[];
  date!: string;
  content!: string;
  showForm: boolean = false;

  constructor(private data: DataService) {
    this.calendar = data.getCalendar();
  }

  ngOnInit(): void {
  }

  addEntry(form: NgForm): void {
    this.data.addCalendarEntry(this.content, this.date);
    form.resetForm();
    this.showForm = false;
  }

  showAdd(): void {
    this.showForm = true;
  }
}
