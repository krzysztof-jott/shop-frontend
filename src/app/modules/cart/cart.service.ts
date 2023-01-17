import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CartSummary } from "../common/model/cart/cartSummary";
import { CartCommonService } from "../common/service/cart-common.service";

@Injectable({
	providedIn: 'root'
})
export class CartService {

	constructor(private http: HttpClient,
			// 3.1 wstrzykuję wydzielony serwis:
			private cartCommonService: CartCommonService) { }


	getCart(id: number): Observable<CartSummary> {
		// 3.2 teraz metoda będzie zwracać co innego, z tego wydzielonego serwisu. To samo robię w order service:
		return this.cartCommonService.getCart(id);
  }

	addToCart(id: number, cartItem: any): Observable<CartSummary> {
		return this.http.put<CartSummary>("/api/carts/" + id, cartItem)
  }

	updateCart(id: number, items: any[]): Observable<CartSummary> {
		return this.http.put<CartSummary>("/api/carts/" + id + "/update", items);
	}

	deleteCartItem(itemId: number): Observable<void> {
		return this.http.delete<void>("/api/cartItems/" + itemId);
	}
}