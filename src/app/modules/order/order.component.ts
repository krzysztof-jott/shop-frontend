import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { OrderService } from "./order.service";
import { CartSummary } from "../common/model/cart/cartSummary";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OrderDto } from "./model/orderDto";
import { OrderSummary } from "./model/orderSummary";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  cartSummary!: CartSummary;
  // 5.1 dodaję pole:
  formGrup!: FormGroup;
  orderSummary!: OrderSummary;

  private statuses = new Map<string, string>([
    ["NEW", "Nowe"],
  ]);

  constructor(private cookieService: CookieService,
              private orderService: OrderService,
              // 5.2 wstrzykuję buildera:
              private formBuilder: FormBuilder,
              ) { }

  ngOnInit(): void { // 2.1 teraz tu:
    this.checkCartEmpty();
    // 5.3 dodaję definicję formularza i walidatory, muszę dodać gettery:
    this.formGrup = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      street: ['', Validators.required],
      zipcode: ['', Validators.required],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
    });

  }
  // 2.0 tworzę metodę:
  checkCartEmpty() {
    // 3.5 pobieram id koszyka:
    let cartId = Number(this.cookieService.get("cartId"));
    this.orderService.getCart(cartId)
            .subscribe(summary => this.cartSummary = summary); // przechodzę do szablonu zamówień
  }


  // 6.2 dodaję metodę:
  submit() {
    if (this.formGrup.valid) { // żeby wysyłać formularz tylko jesli jest poprawnie zwalidowany
      this.orderService.placeOrder({
        firstname: this.formGrup.get('firstname')?.value,
        lastname: this.formGrup.get('lastname')?.value,
        street: this.formGrup.get('street')?.value,
        zipcode: this.formGrup.get('zipcode')?.value,
        city: this.formGrup.get('city')?.value,
        email: this.formGrup.get('email')?.value,
        phone: this.formGrup.get('phone')?.value,
        cartId: Number(this.cookieService.get("cartId"))
      } as OrderDto) // rzutuję do DTO
              // 7.1 w subscribe, jeśli zamówienie zostało złożone pomyślnie, to powinienem usunąć ciastko z id koszyka. Koszyk
              // powinien być wyczyszczony, więc robię cookie service delete:
              .subscribe(orderSummary => { // SPRAWDZIĆ NA KONIEC MODUŁU!!!
                this.orderSummary = orderSummary;
                this.cookieService.delete("cartId"); // nazwa ciastka
              });
    }
  }

  getStatus(status: string) {
    return this.statuses.get(status);
  }

  get firstname() {
    return this.formGrup.get("firstname");
  }

  get lastname() {
    return this.formGrup.get("lastname");
  }

  get street() {
    return this.formGrup.get("street");
  }

  get zipcode() {
    return this.formGrup.get("zipcode");
  }

  get city() {
    return this.formGrup.get("city");
  }

  get email() {
    return this.formGrup.get("email");
  }

  get phone() {
    return this.formGrup.get("phone");
  }
}