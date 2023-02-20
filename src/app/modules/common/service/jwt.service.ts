import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  // 14.0 zapis tokena:
  setToken(token: string) {
    localStorage.setItem("token", token);
  }
  // 14.1 odczyt tokena:
  getToken(): string | null {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem("token");
    return !!(token && this.notExpired(token));
  }

  private notExpired(token: string) {
    let tokenDecoded = jwtDecode<any>(token); // dodaję any, bo jest błąd w return tokenDecoded
    // całość musi być większa od czasu jaki jest teraz:
    return (tokenDecoded.exp * 1000) > new Date().getTime();
  }
}