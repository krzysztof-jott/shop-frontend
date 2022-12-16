import { Component, OnInit } from '@angular/core';
import { SidebarService } from "./sidebar.service";
import { SidebarCategory } from "./model/sidebarCategory";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // 30.2 zmieniam categories, bo były nazwy wpisane na sztywno, na to:
  categories: Array<SidebarCategory> = [];

  // categories = ['Kategoria 1', 'Kategoria 2', 'Kategoria 3', 'Kategoria 4', 'Kategoria 5'];

  constructor(private sidebarService: SidebarService) { }

  // 30.3 wywołuję metodę:
  ngOnInit(): void {
    this.getCategories();
  }

  // 30.1 wywołuję metodę z serwisu:
  getCategories() {
    this.sidebarService.getCategories()
        .subscribe(categories => this.categories = categories);
  }
}