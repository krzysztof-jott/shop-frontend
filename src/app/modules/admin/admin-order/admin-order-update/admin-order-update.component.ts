import { Component, OnInit } from '@angular/core';
import { AdminOrder } from "../model/adminOrder";
import { AdminOrderService } from "../admin-order.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-admin-order-update',
  templateUrl: './admin-order-update.component.html',
  styleUrls: ['./admin-order-update.component.scss']
})
export class AdminOrderUpdateComponent implements OnInit {

  order!: AdminOrder;
  formGroup!: FormGroup;
  // 5.2 tablica nie jest już potrzebna, usuwam:
  // statuses = ['NEW', 'PAID', 'COMPLETED'];
  // 5.3 zmieniam typ statusu na mapę:
  statuses!: Map<string, string>;

  constructor(private adminOrderService: AdminOrderService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder
              ) { }

  ngOnInit(): void {
    this.getOrder();
    // 5.0
    this.getInitData();

  //   1.3 tworzę definicję formularza:
    this.formGroup = this.formBuilder.group({
      orderStatus: ['', Validators.required]
    });
  }

  getOrder() {
    let id = Number(this.activatedRoute.snapshot.params['id']);
    this.adminOrderService.getOrder(id)
            .subscribe(order => { // 1.4 dodaję ustawianie statusu:
              this.order = order;
              this.formGroup.setValue({
                orderStatus: order.orderStatus
              }) // 11.1 dodaję sortowanie po dacie utworzenia, ale muszę najpierw skonwertować daty na wartości numeryczne przez
              // zrobienie nowego obiektu daty:
              order.orderLogs.sort((el1, el2) =>
                      new Date(el2.created).getTime()- new Date(el1.created).getTime())
            });
  }

  changeStatus() {
    this.adminOrderService.saveStatus(this.order.id, this.formGroup.value)
            .subscribe();
  }

  getInitData() {
    this.adminOrderService.getInitData() // muszę zadeklarować tę metodę w serwisie
            .subscribe(data => this.statuses = data.orderStatuses);
  }
}