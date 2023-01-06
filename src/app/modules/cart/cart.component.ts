import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "./cart.service";
import { CartSummary } from "./model/cartSummary";
import { CookieService } from "ngx-cookie-service";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { CartSummaryItem } from "./model/cartSummaryItem";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  summary!: CartSummary;
  // 14.1 dodaję pole:
  formGroup!: FormGroup;

  // 9.2 wstrzykuję activatedRoute, bo będę potrzebował wyciągnąć skądś productId (zrobię to w metodzie OnInit
  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              // 11.1 wstrzykuję cookie service:
              private cookieService: CookieService,
              private router: Router,
              // 14.3 wstrzykuję formBuiler:
              private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // 9.3 pobieram productId. Dodaję Number, żeby nie było wątpliwości jakiego to jest typu:
    let id = Number(this.route.snapshot.queryParams['productId']);
    if (id > 0) {
      this.addToCart(id);
    } else {
      this.getCart();
    }
    // 14.4 inicjalizuję:
    this.formGroup = this.formBuilder.group({
      // inicjalizacja tablicy:
      items: this.formBuilder.array([])
    });
  }
  // 9.1 dodaję 2 metody:

  getCart() {
    // 11.0 implementuję metodę:
    // 11.2 wartość cartId pobieram z cookie i przekazuję do metody poniżej, implementuję metodę w serwisie
    let cartId = Number(this.cookieService.get("cartId"));
    if (cartId > 0) {
      this.cartService.getCart(cartId)
              .subscribe(summary => {
                this.summary = summary
                // 14.7 dodaję to samo pole:
                this.patchFormItems();
              });
    }
  }
  // 11.4 implementuję metodę, ustawiam cookies:
  addToCart(id: number) {
    let cartId = Number(this.cookieService.get("cartId"));
    this.cartService.addToCart(cartId, {productId: id, quantity: 1})
            .subscribe(summary => {
              // muszę przemapować summary jeszcze raz
              this.summary = summary;
              // 14.6 dodaję pole:
              this.patchFormItems();
              this.cookieService.delete("cartId"); // usuwam cookie przed każdym ustawieniem
              // 11.6 muszę dodać toString, bo wartości w cookie to sringi:
              this.cookieService.set("cartId", summary.id.toString(), this.expiresDays(3));
              this.router.navigate(["/cart"]);
            });
  }

  // 14.5 tworzę metodę. Muszę pobrać definicję elementów items z formularza:
  patchFormItems() {
    let formItems = <FormArray>this.formGroup.get("items"); // pobieram z formularza referencję do putego elementu (z OnInit)
    // iteruję po summary items:
    this.summary.items.forEach(item => {
      // używam metody push na tablicy:
      formItems.push(this.formBuilder.group({
        // kopiuję pola z cartSummaryItems:
        id: [item.id],
        quantity: [item.quantity],
        product: [item.product],
        lineValue: [item.lineValue]
      }));
    });
  }

  expiresDays(days: number): Date {
    // zwraca datę za 3 dni:
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
  // 14.11 dodaję metodę. Muszę wysłać dane i ewentualnie zaktualizować widok z odpowiedzi z serwera:
  submit() {
    let cartId = Number(this.cookieService.get("cartId"));
    // 14.12 tworzę metodę updateCart():
    this.cartService.updateCart(cartId, this.mapToRequestListDto()) // id koszyka biorę z cookie (dodaję linijkę wyżej), drugi parametr to lista obiektów
            // składająca się z productId i quantity, takich jak CartProductDto na backendzie. Muszę teraz przemapować w tym drugim
            // parametrze to co mam w formularzu, bo w formularzu mam tablicę elementów, przemapować na odpowiedni obiekt
            // 14.16 aktualizuję wartość koszyka:
            .subscribe(summary => {
              this.summary = summary;
              this.formGroup.get("items")?.setValue(summary.items);
            });
  }

  // 14.13 wydzielam metodę:
  mapToRequestListDto(): any[] {
    let items: Array<CartSummaryItem> = this.formGroup.get("items")?.value;
    // 14.14 robię mapowanie do obiektu:
    return items.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));
  }

  // 15.0 dodaję metodę:
  deleteItem(itemId: number) {
    this.cartService.deleteCartItem(itemId)
            // 17.0 przeładowuję cały komponent, żeby się odświeżył koszyk
            .subscribe(() => this.ngOnInit());
  }

  // 14.6 dodaję gettera:
  get items() {
    return (<FormArray>this.formGroup.get("items")).controls;
  }
}