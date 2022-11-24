import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AdminProductService} from "./admin-product.service";
import {MatPaginator} from "@angular/material/paginator";
import {startWith, switchMap} from "rxjs";
import {AdminProduct} from "./adminProduct";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductsComponent implements AfterViewInit { // 15.3 dodałem interfejs AfterViewInit, usuwam OnInit

  // 9.2 dodaję puste tabele, że pozbyć się błędu w html:
  // 10.1 dodaję dataSource i przechodzę do html
  // 15.1 dodaję konfigurację, która połączy dataSource z paginatorem:
  // dataSource: AdminProduct[] = []; 15.2 usuwam
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ["id", "name", "price"]; // currency wyświetli się w tym samym polu co price, nie trzeba tu dodawać
  totalElements: number = 0; // 15.8
  dataSource: AdminProduct[] = [];

  // 14.2 wstrzykuję serwis:
  constructor(private adminProductService: AdminProductService) { }

  // 14.4 uruchamiam jeszcze tu:
  // 15.5 usuwam tę metodę, wszystko będzie teraz w After:
/*  ngOnInit(): void {
    this.getProducts()
  }*/

// 15.4 utworzyła się nowa pusta metoda:
  ngAfterViewInit(): void {
    this.paginator.page.pipe( // pipe coś jak Observable, ale pozwala na nim używać dodatkowych operatorów
        // trzeba dodać operator startWith z pustym obiektem {}, nie uruchomi się za pierwszym razem pobieranie danych
        startWith({}),
        switchMap(() => { // jeśli mamy Observejbla i przetwarzamy go operatorami, to operator switchMap pozwala zamienić go na nowego
          // observejbla z danymi, które będą tu zwrócone:
          return this.adminProductService.getProducts(this.paginator.pageIndex, this.paginator.pageSize);
        }),
        // 15.7 usunął tego mapa i zrobił prosciej, tylko to co w subscribe:
/*        map(data => {
          this.totalElements = data.totalElements;
          return data.content;
        })*/
    ).subscribe(data => {
      this.totalElements = data.totalElements;
      this.dataSource = data.content;
    }) // teraz zaczeło działać stronicowanie
  }
  // 14.3 dodaję metodę getProducts:
  // 15.6 usuwam metodę:
/*  public getProducts() {
    this.adminProductService.getProducts(0, 25)
        .subscribe(page => this.dataSource = page.content) // bez subscribe nie ruszy. Uruchamiam metodę w OnInit
  }*/
}