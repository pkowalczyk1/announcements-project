import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    email!: string;
    password!: string;

    constructor(private auth: AuthService) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.auth.createUser(this.email, this.password);
    }

}
