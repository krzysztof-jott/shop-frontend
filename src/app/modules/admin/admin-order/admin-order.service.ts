import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AdminOrder } from "./model/adminOrder";
import { HttpClient } from "@angular/common/http";
import { Page } from "../../common/model/page";

@Injectable({
	providedIn: 'root'
})
export class AdminOrderService {

	constructor(private http: HttpClient) { }

	getOrders(pageIndex: number, pageSize: number): Observable<Page<AdminOrder>> {
		return this.http.get<Page<AdminOrder>>(`/api/admin/orders?page=${pageIndex}&size=${pageSize}`);
	}

	getOrder(id: number): Observable<AdminOrder> {
		return this.http.get<AdminOrder>("/api/admin/orders/" + id);
	}

	// 2.0
	saveStatus(id: number, value: any): Observable<void> {
		return this.http.patch<void>("/api/admin/orders/" + id, value);
	}

	// 5.1 deklaruję metodę. Muszę sprawić, żeby zwracała odpowiedniego obserwejbla:
	getInitData(): Observable<any> {
		return this.http.get<any>("/api/admin/orders/initData");
	}

	// 15.3:
	exportOrders(from: string, to: string, orderStatus: string): Observable<any> { // 21.0 dodaję tablicę konfiguracyjną
		// i usuwam z get generyka:
		return this.http.get(`/api/admin/orders/export?from=${from}&to=${to}&orderStatus=${orderStatus}`,
			  {responseType: 'blob', observe: 'response'});
	}
}