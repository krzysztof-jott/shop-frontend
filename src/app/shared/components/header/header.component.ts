import { Component, OnInit } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HeaderService } from "./header.service";
import { CartIconService } from "../../../modules/common/service/cart-icon.service";
import { JwtService } from "../../../modules/common/service/jwt.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = "Stonka";
  cartProductCounter = "";
  // 57.1 dodaję flagę
  isLoggedIn = false;

  constructor(private cookieService: CookieService,
              private headerService: HeaderService,
              private cartIconService: CartIconService,
              // 57.0 wstrzykuję jwt serwis:
              private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.getCountProducts();
    this.cartIconService.subject
            .subscribe(counter => this.cartProductCounter = String(counter > 0 ? counter : ""));
    // 57.2 dodaję tutaj:
    this.isLoggedIn = this.jwtService.isLoggedIn();
  }

  getCountProducts() {
    return this.headerService.getCountProducts(Number(this.cookieService.get("cartId"))) // pobieram cookie z serwisu
            .subscribe(
                    counter => this.cartProductCounter = String(counter > 0 ? counter : "")); // jesli pusto, to nie pokazuję nic przy ikonce, dlatego > 0
  }
}