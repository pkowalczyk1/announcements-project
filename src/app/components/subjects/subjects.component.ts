import {Component, Input, OnInit} from '@angular/core';
import {Subject} from "../../model/subject";
import {DataService} from "../../services/data-service/data.service";
import {Observable} from "rxjs";
import {NgForm} from "@angular/forms";
import firebase from "firebase/compat";

@Component({
    selector: 'app-subjects',
    templateUrl: './subjects.component.html',
    styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {
    @Input() user!: firebase.User | null;

    subjects$: Observable<Subject[]>;
    showAdd: boolean = false;
    newEntry!: string;

    constructor(private data: DataService) {
        this.subjects$ = data.getSubjects();
    }

    ngOnInit(): void {
    }

    showForm(): void {
        this.showAdd = true;
    }

    newSubject(infoForm: NgForm) {
        this.data.addSubject(this.newEntry);
        this.showAdd = false;
        infoForm.resetForm();
    }

    deleteSubject(id: string): void {
        this.data.deleteSubject(id);
    }

}
