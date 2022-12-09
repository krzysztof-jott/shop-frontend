import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductDetails} from "./model/productDetails";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  // 26.1UP wstrzykuję klienta http
  constructor(private http: HttpClient) { }

// 26.0UP  robię metodę, która pobierze dane produktu:
  getProductDetails(slug: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>("/api/products/" + slug); // 26.2UP tworzę folder model w product-details
    // i dodaję tam interface productDetails
  }
}