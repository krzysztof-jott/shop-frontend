import { Injectable } from '@angular/core';
import { CartCommonService } from "../common/service/cart-common.service";
import { Observable } from "rxjs";
import { CartSummary } from "../common/model/cart/cartSummary";
import { HttpClient } from "@angular/common/http";
import { OrderSummary } from "./model/orderSummary";
import { OrderDto } from "./model/orderDto";
import { InitData } from "./model/initData";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // 3.3 wstrzykuję wydzielony serwis:
  constructor(private cartCommonService: CartCommonService,
              private http: HttpClient) { }

  // 3.4 kopiuję metodę z serwisu i idę do komponentu order:
  getCart(id: number): Observable<CartSummary> {
    return this.cartCommonService.getCart(id);
  }

  // 7.0 tworzę metodę do zapisu zamówienia, dodaję interfejsy OrderSummary i OrderDto:
  placeOrder(order: OrderDto): Observable<OrderSummary> { // zwraca podsumowanie z zamówienia:
    return this.http.post<OrderSummary>("/api/orders", order); // potrzebuję id zamówienia i być może datę utworzenia
  }

// 17.0
  getInitData(): Observable<InitData> {
    return this.http.get<InitData>("/api/orders/initData") // muszę dodać DTO
  }
}