import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminOrderService } from "../admin-order.service";

@Component({
      selector: 'app-admin-order-export',
      templateUrl: './admin-order-export.component.html',
      styleUrls: ['./admin-order-export.component.scss']
})
export class AdminOrderExportComponent implements OnInit {

      formGroup!: FormGroup;
      statuses = [];

      constructor(private formBuilder: FormBuilder,// jak jest formularz, to trzeba go zainicjalizować
                  private adminOrderService: AdminOrderService) {
      }

      ngOnInit(): void {
            // 15.1:
            this.getInitData();
            this.formGroup = this.formBuilder.group({
                  from: ['', Validators.required],
                  to: ['', Validators.required],
                  orderStatus: ['', Validators.required]
            });
      }

      export() {
            // 15.2
            if (this.formGroup.valid) {
                  this.adminOrderService.exportOrders(
                                  this.formGroup.get("from")?.value.toISOString(), // metoda bierze obiekt daty i formatuje go do stringa w postaci ISO
                                  this.formGroup.get("to")?.value.toISOString(),
                                  this.formGroup.get("orderStatus")?.value,
                          )
                          // 21.1 dodaję bloba:
                          .subscribe(response => {
                                let a = document.createElement('a');
                                let objectUrl = URL.createObjectURL(response.body);
                                a.href = objectUrl;
                                a.download = response.headers.get("Content-Disposition");
                                a.click();
                                URL.revokeObjectURL(objectUrl);
                          });
            }
      }

      // 15.0 kopiuję z admin order update:
      getInitData() {
            this.adminOrderService.getInitData() // muszę zadeklarować tę metodę w serwisie
                    .subscribe(data => this.statuses = data.orderStatuses);
      }
}