import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { AdminCategoryNameDto } from "../common/dto/AdminCategoryNameDto";
import { HttpClient } from "@angular/common/http";
import {AdminCategory} from "./model/AdminCategory";

@Injectable({
  providedIn: 'root'
})
export class AdminCategoryService {
  constructor(private http: HttpClient) { }

  // 22.0 kopiuję serwis z form-category.serwis i wstrzykuję do konstruktora klienta http:

  getCategories(): Observable<Array<AdminCategoryNameDto>> {
    return this.http.get<Array<AdminCategoryNameDto>>("/api/admin/categories")
  }

  // 25.2 tworzę metodę:
  createCategory(value: any): Observable<AdminCategory> {
    return this.http.post<AdminCategory>("/api/admin/categories", value); // 26.1 wracam do komponentu
  }

  // 27.7 tworzę metodę i wracam do komponentu:
  getCategory(id: number) {
    return this.http.get<AdminCategory>("/api/admin/categories/" + id);
  }
   // 27.11 dodaję metodę:
  saveProduct(id: number, value: any) {
    return this.http.put<AdminCategory>("/api/admin/categories/" + id, value);
  }

  // 28.2 dodaję metodę:
  delete(id: number): Observable<void> {
    return this.http.delete<void>("/api/admin/categories/" + id);
  }
}