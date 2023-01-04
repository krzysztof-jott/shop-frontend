import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CartSummary } from "./model/cartSummary";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  // 10.1 dodaję metodę:
  getCart(id: number): Observable<CartSummary> {
    return this.http.get<CartSummary>("/api/carts/" + id);
  }
  // 11.3 dodaję metodę:
  addToCart(id: number, cartItem: any): Observable<CartSummary> {
    return this.http.put<CartSummary>("/api/carts/" + id, cartItem) // po id potrzebuję jeszcze obiektu, który będzie przekazywał dane
  }
}