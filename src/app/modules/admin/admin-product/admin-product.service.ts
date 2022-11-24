import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "../../../shared/model/page";
import {HttpClient} from "@angular/common/http";
import {AdminProduct} from "./adminProduct";

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
// 14.1 wstrzykuję klienta http:
  constructor(private http: HttpClient) {
  }
// 14.0 kopiuję metodę z product.service.ts i zmieniam:
  getProducts(page: number, size: number): Observable<Page<AdminProduct>> {
    return this.http.get<Page<AdminProduct>>(`/api/products?page=${page}&size=${size}`);
  }
}