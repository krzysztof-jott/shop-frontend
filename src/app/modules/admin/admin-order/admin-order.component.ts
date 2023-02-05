import { Component, ViewChild } from '@angular/core';
import { AdminOrder } from "./model/adminOrder";
import { AdminOrderService } from "./admin-order.service";
import { MatPaginator } from "@angular/material/paginator";
import { map, startWith, switchMap } from "rxjs";

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.scss']
})
export class AdminOrderComponent {

  data: Array<AdminOrder> = [];
  displayedColumns: string[] = ["id", "placeDate", "orderStatus", "grossValue", "actions"];
  totalElements: number = 0;
  // 5.5 dodaję tu:
  statuses!: Map<string, string>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminOrderService: AdminOrderService) {
  }

  ngAfterViewInit(): void {
    // 5.7 dodaję wywołanie i przechodzę do szablonu:
    this.getInitData();
    this.paginator.page.pipe(
                    startWith({}),
                    switchMap(() => {
                      return this.adminOrderService.getOrders(this.paginator.pageIndex, this.paginator.pageSize);
                    }),
                    map(data => {
                      if (data === null) {
                        return [];
                      }
                      this.totalElements = data.totalElements;
                      return data.content;
                    }))
            .subscribe(data => this.data = data);
  }

  // 5.6 dodaję
  getInitData() {
    this.adminOrderService.getInitData()
            // 7.1 dodaję nową mapę
            .subscribe(data => this.statuses = new Map(Object.entries(data.orderStatuses))); // czylli te dane, które mam w tej usłudze
  }

  resolveStatus(status: string) {
    return this.statuses.get(status);
  }
}