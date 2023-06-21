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
  isLoggedIn = false;

  constructor(private cookieService: CookieService,
              private headerService: HeaderService,
              private cartIconService: CartIconService,
              private jwtService: JwtService
  ) {
  }

  ngOnInit(): void {
    this.getCountProducts();
    this.cartIconService.subject
            .subscribe(counter => this.cartProductCounter = String(counter > 0 ? counter : ""));
    this.isLoggedIn = this.jwtService.isLoggedIn();
  }

  getCountProducts() {
    return this.headerService.getCountProducts(Number(this.cookieService.get("cartId")))
            .subscribe(
                    counter => this.cartProductCounter = String(counter > 0 ? counter : ""));
  }
}