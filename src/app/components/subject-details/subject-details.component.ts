import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data-service/data.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Subject} from "../../subject";
import {NgForm} from "@angular/forms";
import {AuthServiceService} from "../../services/auth-service/auth-service.service";
import firebase from "firebase/compat";
import {SubjectInfo} from "../../subject-info";

@Component({
  selector: 'app-subject-details',
  templateUrl: './subject-details.component.html',
  styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit, OnDestroy {
  id: string;
  subject$: Observable<Subject>;
  subject!: Subject;
  subscription1: Subscription;
  newEntry!: string;
  extendable: boolean = false;
  subInfo!: string;
  user!: firebase.User | null;
  subscription2: Subscription;
  showSubform: boolean[] = [];

  constructor(private data: DataService, private route: ActivatedRoute, private auth: AuthServiceService) {
    this.id = route.snapshot.params["id"];
    this.subject$ = data.getSubject(this.id);
    this.subscription1 = this.subject$.subscribe((value) => {
      this.subject = value;
      this.showSubform = new Array(this.subject.infos.length).fill(false);
    });
    this.subscription2 = this.auth.currentUser$.subscribe(value => {
      this.user = value;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }

  newInfo(form: NgForm): void {
    this.subject.infos.push({content: this.newEntry, isExtendable: this.extendable, texts: []});
    form.resetForm();
    this.data.updateSubject(this.id, this.subject);
  }

  newSubInfo(form: NgForm, index: number): void {
    this.subject.infos[index].texts.push(this.subInfo);
    form.resetForm();
    this.data.updateSubject(this.id, this.subject);
    this.showSubform[index] = false;
  }

  moveUp(index: number): void {
    let tmp: SubjectInfo = this.subject.infos[index - 1];
    this.subject.infos[index - 1] = this.subject.infos[index];
    this.subject.infos[index] = tmp;
    this.data.updateSubject(this.id, this.subject);
  }

  moveDown(index: number): void {
    let tmp: SubjectInfo = this.subject.infos[index + 1];
    this.subject.infos[index + 1] = this.subject.infos[index];
    this.subject.infos[index] = tmp;
    this.data.updateSubject(this.id, this.subject);
  }

  deleteInfo(index: number): void {
    this.subject.infos.splice(index, 1);
    this.data.updateSubject(this.id, this.subject);
  }

  showForm(index: number): void {
    this.showSubform[index] = true;
  }

}
