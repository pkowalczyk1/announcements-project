import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-important-info',
  templateUrl: './important-info.component.html',
  styleUrls: ['./important-info.component.css']
})
export class ImportantInfoComponent implements OnInit {
  infos: string[] = [];
  newEntry!: string;

  constructor() { }

  ngOnInit(): void {
  }

  newInfo(form: NgForm) {
    this.infos.push(this.newEntry);
    form.resetForm();
  }

}
