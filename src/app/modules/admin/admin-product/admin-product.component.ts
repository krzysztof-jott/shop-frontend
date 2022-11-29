import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {AdminProductService} from "./admin-product.service";
import {MatPaginator} from "@angular/material/paginator";
import {startWith, switchMap} from "rxjs";
import {AdminProduct} from "./adminProduct";
import {AdminConfirmDialogService} from "../admin-confirm-dialog.service";
import {MatTable} from "@angular/material/table";

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
  // 43.9 dodaję referencję:
        @ViewChild(MatTable) table!: MatTable<any>;
  displayedColumns: string[] = ["id", "name", "price", "actions"]; // currency wyświetli się w tym samym polu co price, nie trzeba tu dodawać
  totalElements: number = 0; // 15.8
  dataSource: AdminProduct[] = [];

  // 14.2 wstrzykuję serwis:
  constructor(private adminProductService: AdminProductService,
              // 42.5 wstrzykuję serwis:
              private dialogService: AdminConfirmDialogService
  ) { }

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
  // 42.4 tworzę metodę:
  // 43.9 zmieniam (id: number) na:
        confirmDelete(element: AdminProduct) {
  // confirmDelete(id: number) {
    this.dialogService.openConfirmDialog("Czy na pewno chcesz usunąć produkt?")
    // 43.2 dodaję co się stanie po zamknięciu okna:
        .afterClosed()
        // 43.3 muszę się zasubskrybować na Obserwejbla. Dostanę wynik z okna dialogowego true albo false:
        .subscribe(result => {
          if (result) {
            this.adminProductService.delete(element.id) // z elementu wyciągam id
            // 43.6 subsktybuję się:
                    .subscribe(() => { // 43.7 żeby zaktualizować listę po usunięciu danego produktu, muszę ziterować
                      // po tablicy danych tabeli (mam komponent tabeli, który ma dane i te dane trzeba tak zaktualizować,
                            // żeby się zaktualizował komponent stronicowania):
                      this.dataSource.forEach((value, index) => { // watość elementu i indeks elementu z tablicy
                              // muszę przyrównać element do value:
                              if (element == value) { // element, który mam, przyrównuję do każdego kolejnego elementu
                                      // w iteracjach i jeśli to ten sam element to muszę usunąć z dataSource:
                                      this.dataSource.splice(index, 1) // 1 - ilość elementów do usunięcia
                                      // 43.8 żeby widok był widoczny muszę zrenderować całą tabelę - potrzebuję referencji do tabeli.
// dodaję te referencję u góry
                                      // 43.10 teraz mogę użyć tej tabeli tu:
                                      this.table.renderRows(); // jeśli usuwamy dane z tablicy, trzeba zrobić renderowanie wierszy
                                      // tabeli. Dzięku temu zrenderuje się też komponent stronicowania.
                              }
                      })
                    })
            ;
          }
        })
    ;
  }
}