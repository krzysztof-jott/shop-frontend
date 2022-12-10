import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "../../../shared/model/page";
import {HttpClient} from "@angular/common/http";
import {AdminProduct} from "./adminProduct";

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(page: number, size: number): Observable<Page<AdminProduct>> {
    return this.http.get<Page<AdminProduct>>(`/api/products?page=${page}&size=${size}`);
  }

  delete(id: number): Observable<void> {

    return this.http.delete<void>('/api/admin/products/' + id); // void, bo po usuwaniu nic nie zwracamy
  }
}