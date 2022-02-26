import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import firebase from "firebase/compat";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  currentUser$: Observable<firebase.User | null>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.currentUser$ = this.afAuth.authState;
  }

  createUser(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigate(['home']);
      })
      .catch(error => window.alert(error.message));
  }

  login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(result => {
        this.router.navigate(['home']);
      })
      .catch(error => window.alert(error.message));
  }

  logout(): void {
    this.afAuth.signOut()
      .then(result => {
        this.router.navigate(['home']);
      })
      .catch(error => window.alert(error.message));
  }
}
