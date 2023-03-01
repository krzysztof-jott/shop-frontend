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
              private router: Router) { }

  ngOnInit(): void {
    // 38.0 dodaję warunek:
    if (this.jwtService.isLoggedIn()) {
      this.router.navigate([this.REDIRECT_ROUT]);
    }
    // 24.0 definicje formularzy:
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
    // 39.0
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value) // tworzę metodę login() w serwisie
              .subscribe({ // odbieranie odpowiedzi i obsługa błędów:
                next: response => {
                  this.jwtService.setToken(response.token);
                  this.router.navigate([this.REDIRECT_ROUT]);
                  this.loginError = false;
                },
                error: err => this.loginError = true
              });
    }
  }

  // 25.1
  register() {
    if (this.registerForm.valid && this.isPasswordIdentical(this.registerForm.value)) {
      this.loginService.register(this.registerForm.value)
              // 27.0 wypełniam, mogę zalogować usera i przekierować na stronę główną albo na profil, muszę zwrócić token
              // z tej usługi. Póki co nie mam profilu użytkownika więc przekierowuję na stronę główną:
              .subscribe({
                next: response => {
                  this.jwtService.setToken(response.token);
                  this.router.navigate([this.REDIRECT_ROUT]); // strona główna
                },
                error: err => {
                  this.registerError = true;
                  // 30.0:
                  if (err.error.message) {
                    this.registerErrorMessage = err.error.message;
                  } else {
                    this.registerErrorMessage = "Coś poszło nie tak, spróbuj później";
                  }
                }
              });
    }
  }

  // 26.0
  private isPasswordIdentical(register: any): boolean {
    // czy stringi są identyczne = = =
    if (register.password === register.repeatPassword) {
      this.registerError = false;
      return true;
    }
    this.registerError = true;
    this.registerErrorMessage = "Podane hasła nie są identyczne";
    return false;
  }
}