import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AdminCategoryNamesDto } from "./AdminCategoryNamesDto";

@Injectable({
  providedIn: 'root'
})
export class FormCategoryService {

  constructor(private http: HttpClient) { }

  // 13.0 tworzę metodę:
  getCategories(): Observable<Array<AdminCategoryNamesDto>> {
    return this.http.get<Array<AdminCategoryNamesDto>>("/api/admin/categories")
  }
}