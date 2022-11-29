import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Page} from "../../../shared/model/page";
import {HttpClient} from "@angular/common/http";
import {AdminProduct} from "./adminProduct";

@Injectable({
  providedIn: 'root'
})
export class AdminProductService {
// 14.1 wstrzykuję klienta http:
  constructor(private http: HttpClient) {
  }
// 14.0 kopiuję metodę z product.service.ts i zmieniam:
  getProducts(page: number, size: number): Observable<Page<AdminProduct>> {
    return this.http.get<Page<AdminProduct>>(`/api/products?page=${page}&size=${size}`);
  }

  // 43.4 dodaję metodę:
  delete(id: number): Observable<void> { // void, bo po usuwaniu nic nie zwracamy. W komponencie będę się chciał zalogować na tego
    // 43.5 Obserwejbla, tak żeby usuwanie zadziałało. Metoda zwraca pustego Obserwejbla (nie ma w nim danych, ale i tak wyemituje event
    // po zakończeniu wywoływania metody
    return this.http.delete<void>('/api/admin/products/' + id); // void, bo po usuwaniu nic nie zwracamy
  }
}