import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SidebarCategory } from "./model/sidebarCategory";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private http: HttpClient) { }

  // 30.0 tworzę metodę do pobierania kategorii:
  getCategories(): Observable<Array<SidebarCategory>> {
    return this.http.get<Array<SidebarCategory>>("/api/categories");
  }
}