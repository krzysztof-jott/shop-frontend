import { Injectable } from '@angular/core';
import { Product } from "./model/product";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Page } from "../../shared/model/page";

@Injectable({ // dekorator oznacza, że można ten serwis wstrzykiwać w dowolne miejsce
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }
  getProducts(page: number, size: number): Observable<Page<Product>> { // 7.9 dodaję parametry do metody getProducts
    // 7.10 korzystam z interpolacji stringa (dodawanie parametrów w nawiasie klamrowym po dolarze) - zamieniam cudzysłów na apostrof
    // ten pod tyldą w urlu i po ? dodaję parametry:
    // DOPIERO TERAZ ZMIENIAJĄ SIĘ STRONY:
    return this.http.get<Page<Product>>(`/api/products?page=${page}&size=${size}`); // parametr generyczny mówi metodzie,
    // że dane, które będą przychodziły z jakiejś usługi będzie trzeba
  }
}
