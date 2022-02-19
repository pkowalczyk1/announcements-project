import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-important-info',
  templateUrl: './important-info.component.html',
  styleUrls: ['./important-info.component.css']
})
export class ImportantInfoComponent implements OnInit {
  infos: string[];
  newEntry!: string;
  showAdd: boolean;

  constructor(private dataService: DataService) {
    this.infos = this.dataService.getInfo();
    this.showAdd = false;
  }

  ngOnInit(): void {
  }

  newInfo(form: NgForm): void {
    this.dataService.addInfo(this.newEntry);
    form.resetForm();
    this.showAdd = false;
  }

  showForm(): void {
    this.showAdd = true;
  }

}
