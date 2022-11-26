import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AdminProductUpdate} from "./model/adminProductUpdate";

@Injectable({
  providedIn: 'root'
})
export class AdminProductUpdateService {

  // 23.1 wstrzykuję klienta http
  constructor(private http: HttpClient) { }

  // 23.0 tworzę metodę:
  getProduct(id: number): Observable<AdminProductUpdate> { // 23.4 muszę jeszczę zwrócić odpowiedni obiekt
    return this.http.get<AdminProductUpdate>("/api/admin/products/" + id) // 23.2 żeby pobrać produkt tworzę kolejny
    // interfejs adminProductUpdate w folderze model
  }

  // 24.10 tworzę metodę serwisową:
    saveProduct(id: number, value: AdminProductUpdate) { // 24.17 zmianiem any na AdminProductUpdate, bo już jest obiekt zmapowany
      return this.http.put<AdminProductUpdate>('/api/admin/products/' + id, value);   // 24.16 put bo zapisuję edytowany obiekt:
    }
}
