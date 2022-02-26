import { Component, OnInit } from '@angular/core';
import {AuthServiceService} from "../../services/auth-service/auth-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;

  constructor(private auth: AuthServiceService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.auth.createUser(this.email, this.password);
  }

}
