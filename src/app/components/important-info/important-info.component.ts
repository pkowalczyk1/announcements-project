import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {DataService} from "../../services/data.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-important-info',
  templateUrl: './important-info.component.html',
  styleUrls: ['./important-info.component.css'],
  animations: [
    trigger(
      'showHideAnimation',
      [
        transition(
          ':enter',
          [
            style({opacity: 0}),
            animate('0.7s ease-out',
              style({opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({opacity: 1}),
            animate('0.7s ease-in',
              style({opacity: 0}))
          ]
        )
      ]
    )
  ]
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
