import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginService } from "./login.service";
import { JwtService } from "../common/service/jwt.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private readonly REDIRECT_ROUT = "/profile";
  loginForm!: FormGroup;
  loginError = false;
  registerForm!: FormGroup;
  registerError = false;
  registerErrorMessage = "";

  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private jwtService: JwtService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.jwtService.isLoggedIn()) {
      this.router.navigate([this.REDIRECT_ROUT]);
    }
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value)
              .subscribe({
                next: response => {
                  this.jwtService.setToken(response.token);
                  this.router.navigate([this.REDIRECT_ROUT]);
                  this.loginError = false;
                },
                error: err => this.loginError = true
              });
    }
  }

  register() {
    if (this.registerForm.valid && this.isPasswordIdentical(this.registerForm.value)) {
      this.loginService.register(this.registerForm.value)
              .subscribe({
                next: response => {
                  this.jwtService.setToken(response.token);
                  this.router.navigate([this.REDIRECT_ROUT]);
                },
                error: err => {
                  this.registerError = true;
                  if (err.error.message) {
                    this.registerErrorMessage = err.error.message;
                  } else {
                    this.registerErrorMessage = "Coś poszło nie tak, spróbuj później";
                  }
                }
              });
    }
  }

  private isPasswordIdentical(register: any): boolean {
    if (register.password === register.repeatPassword) {
      this.registerError = false;
      return true;
    }
    this.registerError = true;
    this.registerErrorMessage = "Podane hasła nie są identyczne";
    return false;
  }
}