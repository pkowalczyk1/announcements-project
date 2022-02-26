import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data-service/data.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Subject} from "../../subject";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit, OnDestroy {
  id: string;
  subject$: Observable<Subject>;
  subject!: Subject;
  subscription: Subscription;
  newEntry!: string;

  constructor(private data: DataService, private route: ActivatedRoute) {
    this.id = route.snapshot.params["id"];
    this.subject$ = data.getSubject(this.id);
    this.subscription = this.subject$.subscribe((value) => {
      this.subject = value;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  newInfo(form: NgForm): void {
    this.subject.infos.push(this.newEntry);
    form.resetForm();
    this.data.updateSubject(this.id, this.subject);
  }

}
