import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HeaderService } from "./header.service";
import { CartIconService } from "../../../modules/common/service/cart-icon.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "Stonka";
  // 19.0 dodaję pole do zliczania rzeczy w koszyku:
  cartProductCounter = "";

  // 20.1 wstrzykuję coookie i serwis:
  constructor(private cookieService: CookieService,
              private headerService: HeaderService,
              // 21.2 wstrzykuję serwis:
              private cartIconService: CartIconService
  ) { }

  ngOnInit(): void {
   // 20.3 uruchamiam metodę:
    this.getCountProducts();
    // 21.3 muszę się zasubskrybować na ten serwis:
    this.cartIconService.subject
            .subscribe(counter => this.cartProductCounter = String(counter > 0 ? counter : ""));
  }

  // 20.2 dodaję metodę:
  getCountProducts() {
    return this.headerService.getCountProducts(Number(this.cookieService.get("cartId"))) // pobieram cookie z serwisu
            .subscribe(counter => this.cartProductCounter = String(counter > 0 ? counter : "")); // jesli pusto,
    // to nie pokazuję nic przy ikonce, dlatego > 0
  }
}