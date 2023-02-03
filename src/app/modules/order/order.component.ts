import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { OrderService } from "./order.service";
import { CartSummary } from "../common/model/cart/cartSummary";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { OrderDto } from "./model/orderDto";
import { OrderSummary } from "./model/orderSummary";
import { InitData } from "./model/initData";
import { CartIconService } from "../common/service/cart-icon.service";

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
  initData!: InitData;
  errorMessage = false;

  private statuses = new Map<string, string>([
    ["NEW", "Nowe"],
  ]);


  constructor(private cookieService: CookieService,
              private orderService: OrderService,
              // 5.2 wstrzykuję buildera:
              private formBuilder: FormBuilder,
              private cartIconService: CartIconService) { }

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
      shipment: ['', Validators.required],
      payment: ['', Validators.required]
    });
    this.getInitData();

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
        cartId: Number(this.cookieService.get("cartId")),
        //   21.0 dodaję shipmentId:
        shipmentId: Number(this.formGrup.get('shipment')?.value.id),
        // 26.3 dodaję paymentId:
        paymentId: Number(this.formGrup.get('payment')?.value.id)
      } as OrderDto) // rzutuję do DTO
              // 7.1 w subscribe, jeśli zamówienie zostało złożone pomyślnie, to powinienem usunąć ciastko z id koszyka. Koszyk
              // powinien być wyczyszczony, więc robię cookie service delete:
              // 43.0 dodaję obsługę błędów:
              .subscribe({
                next: orderSummary => { // SPRAWDZIĆ NA KONIEC MODUŁU!!!
                  this.orderSummary = orderSummary;
                  this.cookieService.delete("cartId"); // nazwa ciastka
                  this.errorMessage = false;
                  this.cartIconService.cartChanged(0);
                },
                error: err => this.errorMessage = true
              });
    }
  }

  // 17.1 metoda:
  getInitData() {
    this.orderService.getInitData()
            .subscribe(initData => {
              this.initData = initData;
              // 19.0 metoda
              this.setDefaultShipment();
              // 26.1 domyślna płatność i tworzę metodę:
              this.setDefaultPayment();
            }); // dodaję pole u góry i wywołuję w ngOnInit
  }

  private setDefaultShipment() { //19.1  filtruję listę sposobów dostawy
    this.formGrup.patchValue({
      "shipment": this.initData.shipments.filter(
              shipment => shipment.defaultShipment)[0]
    });
  }

  // 26.2 tworzę metodę:
  private setDefaultPayment() {
    this.formGrup.patchValue({
      "payment": this.initData.payments.filter(
              payment => payment.defaultPayment)[0]
    });
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

  get shipment() {
    return this.formGrup.get("shipment");
  }
}