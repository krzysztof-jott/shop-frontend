import { Injectable } from '@angular/core';
import {Product} from "./model/product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({ // dekorator oznacza, że można ten serwis wstrzykiwać w dowolne miejsce
  providedIn: 'root'
})
export class ProductService {

  // 33.0 wstrzykuję klienta http:
  constructor(private http: HttpClient) {

  }

  // 30.0 tworzę metodę:
  // 30.4 zwracam tablicę product
  // 33.2 zmieniam typ na Observable i przechodzę do komponentu:
  getProducts(): Observable<Product[]> {
    // 34.0 poprawiam urla po zrobieniu przekierowania (zamiast localhost daję api):
    return this.http.get<Product[]>("/api/products") // parametr generyczny mówi metodzie, że dane, które będą przychodziły z jakiejś usługi będzie trzeba
    // skonwertować do tego obiektu. Trzeba podać urla, z którego będą pobierane dane

    // 33.1 usuwam i zastępuję tym co powyżej:
    // return [ // wklejam produkty z tablicy
    //   {
    //     name: "Produkt 1",
    //     category: "Kategoria 1",
    //     description: "Opis produktu1",
    //     price: 3,
    //     currency: "PLN"
    //   },
    //   {
    //     name: "Produkt 2",
    //     category: "Kategoria 2",
    //     description: "Opis produktu2",
    //     price: 3,
    //     currency: "PLN"
    //   },
    //   {
    //     name: "Produkt 3",
    //     category: "Kategoria 3",
    //     description: "Opis produktu3",
    //     price: 3,
    //     currency: "PLN"
    //   },
    // ];
  }
}
