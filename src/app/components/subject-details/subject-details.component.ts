import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../services/data-service/data.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Subject} from "../../model/subject";
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth-service/auth.service";
import firebase from "firebase/compat";
import {SubjectInfo} from "../../model/subject-info";
import {StorageService} from "../../services/storage-service/storage.service";
import {FileInfo} from "../../model/file-info";

@Component({
    selector: 'app-subject-details',
    templateUrl: './subject-details.component.html',
    styleUrls: ['./subject-details.component.css']
})
export class SubjectDetailsComponent implements OnInit, OnDestroy {
    id: string;
    subject$: Observable<Subject>;
    subject!: Subject;
    subjectSubscription: Subscription;
    newEntry!: string;
    extendable: boolean = false;
    subInfo!: string;
    user!: firebase.User | null;
    authSubscription: Subscription;
    showSubform: boolean[] = [];
    selectedFiles?: FileList;

    @ViewChild('inputFile') fileInput!: ElementRef;

    constructor(private data: DataService, private route: ActivatedRoute, private auth: AuthService,
                private storage: StorageService) {
        this.id = route.snapshot.params["id"];
        this.subject$ = data.getSubject(this.id);
        this.subjectSubscription = this.subject$.subscribe((value) => {
            this.subject = value;
            this.showSubform = new Array(this.subject.infos.length).fill(false);
        });
        this.authSubscription = this.auth.currentUser$.subscribe(value => {
            this.user = value;
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.subjectSubscription.unsubscribe();
        this.authSubscription.unsubscribe();
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

    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }

    uploadFile(form: NgForm): void {
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);
            this.selectedFiles = undefined;

            if (file) {
                this.storage.pushFileToStorage({file: file}, this.id);
            }
        }

        this.fileInput.nativeElement.value = '';
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

    deleteFile(file: FileInfo): void {
        this.storage.deleteFile(file, this.id);
    }

    showForm(index: number): void {
        this.showSubform[index] = true;
    }

}
