import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CategoryProducts } from "./model/category-products";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategoryWithProducts(slug: string, page: number, size: number): Observable<CategoryProducts> {
    return this.http.get<CategoryProducts>(`/api/categories/${slug}/products?page=${page}&size=${size}`);
  }
}