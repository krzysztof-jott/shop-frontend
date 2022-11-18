import { Component, OnInit } from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./model/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // 29.0 dodaję tablicę z produktami:
  // 30.3 usuwam produkty, zostawiam pustą tablicę products i muszę proprawić błąd (nie zgadza się typ danych), który teraz wyskoczył w metodzie getProducts:
  // dodaję typ any, żeby nie było błędów zgodności:
  // 30.5 zamianiem any[] na Product[]
  products: Product[] = [];
  /*products = [
    {
      name: "Produkt 1",
      category: "Kategoria 1",
      description: "Opis produktu1",
      price: "3",
      currency: "PLN"
    },
    {
      name: "Produkt 2",
      category: "Kategoria 2",
      description: "Opis produktu2",
      price: "3",
      currency: "PLN"
    },
    {
      name: "Produkt 3",
      category: "Kategoria 3",
      description: "Opis produktu3",
      price: "3",
      currency: "PLN"
    },
  ];*/
  // 30.2 w TypeScripcie jeśli wpiszemy w konstruktorze pole typu ProductService, to TypeScript powinien stworzyć pole dla tego serwisu:
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // 30.6 wywołuję metodę getProducts:
    this.getProducts(); // teraz wypełni się pole product danymi z serwisu
  }

// 30.1 tworzę metodę tak, żeby komponent pobierał dane z metody serwisowej, a nie bezpośrednio stąd:
  getProducts() { // trzeba wstrzyknąć serwis ProductSerirvice przez konstruktor, żeby poniżej było dostępne product.service:
    this.products = this.productService.getProducts(); // pobrane produkty z serwisu
  }

}
