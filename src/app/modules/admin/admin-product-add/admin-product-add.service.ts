import { Injectable } from '@angular/core';
import {AdminProductUpdate} from "../admin-product-update/model/adminProductUpdate";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminProductAddService {

  // 29.1 wstrzykuję klienta http:
  constructor(private http: HttpClient) { }

  // 29.0 dodaję metodę saveNewProduct:
  saveNewProduct(product: AdminProductUpdate): Observable<AdminProductUpdate> { // zwraca obserwejbla z AdminProductUpdate
    return this.http.post<AdminProductUpdate>("/api/admin/products", product); // jako body przesyłam product
  }
}
