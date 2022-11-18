import { Injectable } from '@angular/core';
import {Product} from "./model/product";

@Injectable({ // dekorator oznacza, że można ten serwis wstrzykiwać w dowolne miejsce
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  // 30.0 tworzę metodę:
  // 30.4 zwracam tablicę product
  getProducts(): Product[] {
    return [ // wklejam produkty z tablicy
      {
        name: "Produkt 1",
        category: "Kategoria 1",
        description: "Opis produktu1",
        price: 3,
        currency: "PLN"
      },
      {
        name: "Produkt 2",
        category: "Kategoria 2",
        description: "Opis produktu2",
        price: 3,
        currency: "PLN"
      },
      {
        name: "Produkt 3",
        category: "Kategoria 3",
        description: "Opis produktu3",
        price: 3,
        currency: "PLN"
      },
    ];
  }
}
