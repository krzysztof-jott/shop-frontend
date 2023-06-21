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
  statuses!: Map<string, string>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private adminOrderService: AdminOrderService) {
  }

  ngAfterViewInit(): void {
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

  getInitData() {
    this.adminOrderService.getInitData()
            .subscribe(data => this.statuses = new Map(Object.entries(data.orderStatuses)));
  }

  resolveStatus(status: string) {
    return this.statuses.get(status);
  }
}