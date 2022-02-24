import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Subject} from "../../subject";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit {
  id: string;
  subject$: Observable<Subject>;
  newEntry!: string;

  constructor(private data: DataService, private route: ActivatedRoute) {
    this.id = route.snapshot.params["id"];
    this.subject$ = data.getSubject(this.id);
  }

  ngOnInit(): void {
  }

  newInfo(form: NgForm): void {

  }

}
