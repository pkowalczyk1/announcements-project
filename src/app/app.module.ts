import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import {FormsModule} from "@angular/forms";
import { ImportantInfoComponent } from './components/important-info/important-info.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const firebaseConfig = {
  apiKey: "AIzaSyDeq2hzrUqWG8ibhMWHxcZDMTZeQolQTBQ",
  authDomain: "forum-fbe06.firebaseapp.com",
  projectId: "forum-fbe06",
  storageBucket: "forum-fbe06.appspot.com",
  messagingSenderId: "43089257703",
  appId: "1:43089257703:web:0829cc34e60d0ca89d2e42"
};

@NgModule({
  declarations: [
    AppComponent,
    SubjectsComponent,
    ImportantInfoComponent,
    CalendarComponent,
    SubjectDetailsComponent,
    HomePageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
