import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminLoginService } from "./admin-login.service";
import { JwtService } from "../../common/service/jwt.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  formGroup!: FormGroup;
  loginError = false;

  constructor(private formBuilder: FormBuilder,
              private adminLoginService: AdminLoginService,
              // 14.2 wstrzykuję:
              private jwtService: JwtService,
              // 15.0
              private router: Router) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() {
    if (this.formGroup.valid) {
      this.adminLoginService.login(this.formGroup.value)
              .subscribe({ // obsługa błędów:
                // 14.4 dodaję response do lambdy:
                next: (response) => {
                  this.loginError = false;
                  // 35.0
                  if (response.adminAccess) {
                    // 14.3 tu gdzie poprawny rezultat ustawiam tokena:
                    this.jwtService.setToken(response.token);
                    // 37.0 dodaję:
                    this.jwtService.setAdminAccess(true);
                  }
                  // 15.1 robię przekekierowanie po poprawnym logowaniu:
                  this.router.navigate(["/admin"]);
                },
                error: () => this.loginError = true
              });
    }
  }
}