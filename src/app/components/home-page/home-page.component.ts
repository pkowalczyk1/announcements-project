import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
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

    constructor(private auth: AuthService) {
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
