import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import {FormsModule} from "@angular/forms";
import { ImportantInfoComponent } from './components/important-info/important-info.component';

@NgModule({
  declarations: [
    AppComponent,
    SubjectsComponent,
    ImportantInfoComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
