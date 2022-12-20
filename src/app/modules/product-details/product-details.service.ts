import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ProductDetails } from "./model/productDetails";
import { Observable } from "rxjs";
import { Review } from "./model/review";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  constructor(private http: HttpClient) {
  }

  getProductDetails(slug: string): Observable<ProductDetails> {
    return this.http.get<ProductDetails>("/api/products/" + slug);
  }

  // 46.2 tworzę metodę i wracam do submit:
  saveProductReview(review: Review): Observable<Review> {
    return this.http.post<Review>("/api/reviews", review);
  }
}