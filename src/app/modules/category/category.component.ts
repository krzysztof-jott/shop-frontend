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

  categoryProducts!: CategoryProducts;

  private sub!: Subscription;// Subscription to obiekt, który zwraca mi metoda subscribe.

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.sub = this.router.events.pipe( // robię pipe na Obserwejblu (dzięku pajpowi można używać operatorów - filter)
        filter(event => event instanceof NavigationEnd)
    ).subscribe(() => this.getCategoryWithProducts(0, 10)); // wywołuję odświeżenie danych

    this.getCategoryWithProducts(0, 10);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getCategoryWithProducts(page: number, size: number) {
    let slug = this.route.snapshot.params['slug'];
    this.categoryService.getCategoryWithProducts(slug, page, size)
        .subscribe(categoryProducts => this.categoryProducts = categoryProducts);
  }

  onPageChange(event: PageEvent) {
    this.getCategoryWithProducts(event.pageIndex, event.pageSize);
  }
}