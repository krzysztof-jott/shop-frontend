import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductDetails } from "./model/productDetails";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http: HttpClient) { }

  getProductDetails(slug: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>("/api/products/" + slug);
  }
}