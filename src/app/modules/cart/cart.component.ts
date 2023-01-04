import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from "@angular/router";
import { CartService } from "./cart.service";
import { CartSummary } from "./model/cartSummary";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  summary!: CartSummary;

  // 9.2 wstrzykuję activatedRoute, bo będę potrzebował wyciągnąć skądś productId (zrobię to w metodzie OnInit
  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              // 11.1 wstrzykuję cookie service:
              private cookieService: CookieService,
              private router: Router
  ) { }

  ngOnInit(): void {
    // 9.3 pobieram productId. Dodaję Number, żeby nie było wątpliwości jakiego to jest typu:
    let id = Number(this.route.snapshot.queryParams['productId']);
    if (id > 0) {
      this.addToCart(id);
    } else {
      this.getCart();
    }
  }
  // 9.1 dodaję 2 metody:

  getCart() {
    // 11.0 implementuję metodę:
    // 11.2 wartość cartId pobieram z cookie i przekazuję do metody poniżej, implementuję metodę w serwisie
    let cartId = Number(this.cookieService.get("cartId"));
    if (cartId > 0) {
      this.cartService.getCart(cartId)
              .subscribe(summary => this.summary = summary);
    }
  }
  // 11.4 implementuję metodę, ustawiam cookies:
  addToCart(id: number) {
    let cartId = Number(this.cookieService.get("cartId"));
    this.cartService.addToCart(cartId, {productId: id, quantity: 1})
            .subscribe(summary => {
              // muszę przemapować summary jeszcze raz
              this.summary = summary;
              this.cookieService.delete("cartId"); // usuwam cookie przed każdym ustawieniem
              // 11.6 muszę dodać toString, bo wartości w cookie to sringi:
              this.cookieService.set("cartId", summary.id.toString(), this.expiresDays(3));
              this.router.navigate(["/cart"]);
            })
  }

  private expiresDays(days: number): Date {
    // zwraca datę za 3 dni:
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
}