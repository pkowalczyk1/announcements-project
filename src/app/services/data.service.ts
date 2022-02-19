import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  infos: string[] = [];

  constructor() { }

  addInfo(newInfo: string): void {
    this.infos.push(newInfo);
  }

  getInfo(): string[] {
    return this.infos;
  }
}
