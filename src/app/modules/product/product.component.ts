import { Component, OnInit } from '@angular/core';
import {ProductService} from "./product.service";
import {Product} from "./model/product";
import {Page} from "../../shared/model/page";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

//  6.4 usuwam:
/*  products: Product[] = [];
  totalElements: number = 0;*/
  page!: Page<Product>; // ! operator TypeScriptu, pozwala użyć pola/zmiennych, które nie zostały jeszcze zainicjalizowane

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() { // 6.3 zmianiam całą lambdę po dodaniu page! wyżej
    this.getProductPage(0,10); // 7.5 parametry z metody getProductPage

        /*.subscribe(products => {
          this.products = products.content;
          this.totalElements = products.totalElements; // 6.1 po dodaniu totalElements zmieniam lambde, dodaję to
        });*/
  }
// 7.3 tworzę motodę onPageEvent:

  onPageEvent(event: PageEvent) {
    // 7.6 usuwam alert i wywołuję metodę getProductPage, ale z parametrami z eventem:
    // alert(event.pageIndex)
    this.getProductPage(event.pageIndex, event.pageSize); // 7.7 trzeba je teraz przekazać do metody getProducts
  }
// 7.4 wyekstrachowałem metodę z metody getProducts i dodaję do niej 2 parametry page i size:
  private getProductPage(page: number, size: number) { // 7.8 przekazuję parametry do metody getProducts i przechodzę do serwisu:
    this.productService.getProducts(page, size)
        .subscribe(page => this.page = page);
  }
}
