import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private readonly loginService: LoginService, private readonly router: Router) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      secondName: [''],
      phoneNumber: ['+380'],
      password: ['']
    })
  }

  ngOnInit(): void { }

  login() {
    const userName = this.loginForm.get('username')?.value;
    const userPassword = this.loginForm.get('password')?.value;
    const success = this.loginService.checkAdminData(userName, userPassword);
    if(success) {
      this.router.navigate(['main'])
    }
  }

}
