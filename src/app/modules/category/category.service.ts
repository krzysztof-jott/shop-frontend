import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CategoryProducts } from "./model/category-products";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // 33.3 dodaję taką sama metodę i wstrzykuję serwis w komponencie:
  // 41.3 dodaję page i size
  getCategoryWithProducts(slug: string, page: number, size: number): Observable<CategoryProducts> { // 40.3 zmieniam Category na CategoryProducts
    return this.http.get<CategoryProducts>(`/api/categories/${slug}/products?page=${page}&size=${size}`); // dodaję z produktu część adresu od znaku zapytania
  }
}