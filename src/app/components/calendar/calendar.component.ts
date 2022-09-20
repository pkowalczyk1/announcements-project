import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CalendarEntry} from "../../model/calendar-entry";
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data-service/data.service";
import {Observable, Subscription} from "rxjs";
import firebase from "firebase/compat";

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
    @Input() user!: firebase.User | null;

    calendar$: Observable<CalendarEntry[]>;
    calendar!: CalendarEntry[];
    date!: string;
    content!: string;
    showForm: boolean = false;
    subscription!: Subscription;

    constructor(private data: DataService) {
        this.calendar$ = data.getCalendar();
    }

    ngOnInit(): void {
        this.subscription = this.calendar$.subscribe(value => {
            value.sort((a, b) => a.date - b.date);
            this.calendar = value;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    addEntry(form: NgForm): void {
        this.data.addCalendarEntry(this.content, this.date);
        form.resetForm();
        this.showForm = false;
    }

    deleteEntry(id: string): void {
        this.data.deleteCalendarEntry(id);
    }

    showAdd(): void {
        this.showForm = true;
    }
}
