import { Component, OnInit } from '@angular/core';
import { ProfileService } from "./profile.service";
import { OrderListDto } from "./model/orderListDto";
import { JwtService } from "../common/service/jwt.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  orders!: Array<OrderListDto>;
  displayedColumns = ["id", "placeDate", "orderStatus", "grossValue"];

  constructor(private profileService: ProfileService,
              // 59.0
              private jwtService: JwtService,
              private router: Router) { }

  ngOnInit(): void {
    // 59.1 jeśli nie jest zalogowany to przekirowuję do formularza logowania:
    if (!this.jwtService.isLoggedIn()) {
      this.router.navigate(["/login"]);
    }
    this.getOrders();
  }

  getOrders() {
    this.profileService.getOrders()
            .subscribe(orders => this.orders = orders)
  }
}