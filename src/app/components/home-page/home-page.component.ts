import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthServiceService} from "../../services/auth-service/auth-service.service";
import {Subscription} from "rxjs";
import firebase from "firebase/compat";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  user!: firebase.User | null;

  constructor(private auth: AuthServiceService) {
    this.subscription = this.auth.currentUser$.subscribe((value) => {
      this.user = value;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
