import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";
import {Subscription} from "rxjs";
import firebase from "firebase/compat";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    user!: firebase.User | null

    constructor(public auth: AuthService) {
        this.subscription = this.auth.currentUser$.subscribe((value) => {
            this.user = value;
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
