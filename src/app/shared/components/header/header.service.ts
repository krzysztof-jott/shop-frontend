import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor(private http: HttpClient ) { }

//   20.0 dodaję metodę:
  getCountProducts(cartId: number): Observable<Number> {
    return this.http.get<Number>("/api/cartItems/count/" + cartId); // cartId pobieram z cookie
  }
}