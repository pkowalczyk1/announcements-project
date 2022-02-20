import { Injectable } from '@angular/core';
import {Info} from "../info";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  infos: Info[] = [];
  currId: number = 0;

  constructor() { }

  addInfo(newInfo: string): void {
    this.infos.push({id: this.currId, text: newInfo});
    this.currId++;
  }

  getInfo(): Info[] {
    return this.infos;
  }
}
