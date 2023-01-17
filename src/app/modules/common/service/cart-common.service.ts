import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { CartSummary } from "../model/cart/cartSummary";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartCommonService {

  constructor(private http: HttpClient) { }

  // 3.0 muszę ten serwis teraz wstrzyknąć do serwisu, z którego przenosiłem tę metodę, do cart.service
  getCart(id: number): Observable<CartSummary> {
    return this.http.get<CartSummary>("/api/carts/" + id);
  }
}