import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from "./category.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter, Subscription } from "rxjs";
import { CategoryProducts } from "./model/category-products";
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit, OnDestroy{

  // 33.1 dodaję zmienną:
  // 40.1 zmieniam pole:
  categoryProducts!: CategoryProducts;
  // 36.1 dodaję pole. Subscription to obiekt, który zwraca mi metoda subscribe.
  private sub!: Subscription;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              // 35.1 wstrzykuję router:
              private router: Router
  ) { }

  ngOnInit(): void {
    // 35.2 w metodzie onInit muszę wyfiltrować eventy NavigationEnd i w metodzie subscribe odświeżyć dane:
    // 36.2 dodaję sub = ...:
    this.sub = this.router.events.pipe( // robię pipe na Obserwejblu (dzięku pajpowi można używać operatorów - filter)
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getCategoryWithProducts(0, 10)); // wywołuję odświeżenie danych

    // 33.5 wywołuję metodę na koniec:
    this.getCategoryWithProducts(0, 10); // 41.2 dodaję parametry, wyżej też
  }

  // 36.0 dodaję u góry OnDestroy. Muszę się odsubskrybować z routera, żeby nie przetwarzał ciągle tych eventów:
  ngOnDestroy(): void { // tu się odsubskrybowuję z routera z tym komponencie:
    this.sub.unsubscribe();
  }

  // 33.2 dodaję metodę, potem tworzę serwis i przechodzę do niego i dodaję taką samą metodę:
  // 41.1 dodaję page i size:
  getCategoryWithProducts(page: number, size: number) {
    // z route pobieram sluga:
    let slug = this.route.snapshot.params['slug'];
    this.categoryService.getCategoryWithProducts(slug, page, size) // 41.2 dodaję page i size
        .subscribe(categoryProducts => this.categoryProducts = categoryProducts); // 40.2 zmieniam category na categoryProducts
  }

  onPageChange(event: PageEvent) {
    this.getCategoryWithProducts(event.pageIndex, event.pageSize);
  }
}