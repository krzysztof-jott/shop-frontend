import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdminProductUpdateService} from "./admin-product-update.service";
import {AdminProductUpdate} from "./model/adminProductUpdate";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../admin-message.service";

@Component({
  selector: 'app-admin-product-update',
  templateUrl: './admin-product-update.component.html',
  styleUrls: ['./admin-product-update.component.scss']
})
export class AdminProductUpdateComponent implements OnInit {

  product!: AdminProductUpdate; // 23.6 tu dodaję to pole
  productForm!: FormGroup; // 24.1 pole typu FormGroup (definicja dla formularza, może być ich więcej) (! żeby TypeScript nie zgłaszał błędu)

  // 22.0 tu wstrzykuję router. Będę teraz mógł pobrać id z urla:
  // 23.5 wstrzykuję serwis w komponencie:

    constructor(private router: ActivatedRoute,
                private adminProductUpdateService: AdminProductUpdateService,
                // 24.3 trzeba zainicjalizować formularz, korzystam z FormBuilder i wstrzykuję tu:
                private formBuilder: FormBuilder,
                // 25.0 wstrzykuję do komponentu obiekt Snackbar i idę do metody submit:
                private snackBar: MatSnackBar,
                // 37. 1 wstrzykuję serwis
                private adminMessageService: AdminMessageService
    ) { }

  ngOnInit(): void { // 23.7 i teraz muszę tę metodą wywołać tutaj:
    this.getProduct();
    // 24.4 żeby zainicjować formularz dodaję tu:
    this.productForm = this.formBuilder.group({ // dodaję obiekt, wypisuję pola, które są w formularzu:
        //38.2 dodaję walidatory:
      name: ['', [Validators.required, Validators.minLength(4)]], // tablica konfiguracyjna, pierwsza wartość to zawsze wartość domyślna (tutaj puste pole)
      description: ['', [Validators.required, Validators.minLength(4)]],
      category: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, Validators.min(0)]],
      currency: ['PLN', Validators.required]
    })
  }

  // 22.1 tworzę metodę, korzystam z routera:
  getProduct() {
    // 22.2 tworzę zmienną lokalną id:
    // let id = this.router.snapshot.params['id'];
    // 22.3 rzutuję to co jest w parametrze powyżej do wartości numerycznej i teraz tak wygląda:
    let id = Number(this.router.snapshot.params['id']);
      this.adminProductUpdateService.getProduct(id)
          // 24.5 żeby ustawić wartości w formularzu korzystam tu z metodu setValue (usuwam po lambdzie wszystko):
          /*.subscribe(product => this.product = product) // 23.5 muszę utworzyć polę product wyżej*/
          // 24.20 to też wydzielam do metody prywatnej:
          /*.subscribe(product => this.productForm.setValue({ // 24.6 będą te same pola co u góry:
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            currency: product.currency
          }));*/
          // 24.21 i teraz jest:
          .subscribe(product => this.mapFormValues(product));
  }
// 24.8 tworzę metodę sumbit, pobiera dane z formularza i przekazuje do metody serwisowej, która zapisze produkt:
    submit() {
        // 24.9 pobieram id tak jak u góry:
        let id = Number(this.router.snapshot.params['id']);
        // 24.12 to poniżej zamieniam na mapowanie na obiekt DTO:
        /*this.adminProductUpdateService.saveProduct(id, this.productForm.value); // metoda będzie miała 2 parametry: id edytownego*/
        // produktu i drugi obiekt, który będę zapisywać
        // 24.11 this.productForm.value - obiekt jest przechowywany w value, strukturą odpowiada DTO, które jest na backendzie,
        // ale kiedy obiekt formularza nie odpowiada 1:1 obiektoi DTO, trzeba przemapować ten obiekt na DTO. Tutaj:
        // interfejs AdminProductUpdate. Więc gdyby to nie było 1:1 i chciałbym przemapować, to miałoby to postać:
        // 24.13 dodaję mapowanie:
        this.adminProductUpdateService.saveProduct(id, {
            // 24.14 tworzę obiekt i pobieram dane z formularza:
            name: this.productForm.get('name')?.value, // znak ?, żeby nie było problemów z nullem
            description: this.productForm.get('description')?.value,
            category: this.productForm.get('category')?.value,
            price: this.productForm.get('price')?.value,
            currency: this.productForm.get('currency')?.value,
        } as AdminProductUpdate) // 24.15 rzutowanie w TypeScripcie, czyli ten obiekt anonimowy, który tu tworzę będzie
            // typu AdminProductUpdate. Zostają wtedy zachowane typy i mam przekonwertowany obiekt. Przechodzę do serwisu.
            // 24.18 znowu dodaję tu jakieś gówno:
            // 37.0 poprawiam metodę subscribe():
            .subscribe({
                next: product => {
                    // .subscribe(product => { // 25.1 dodaję Snackbara:
                    this.mapFormValues(product); // 24.19 teraz gdy zmienią produkt w formularzu, to zapisze się na backendzie w bazie danych. Backend zwróci mi
                    // zmieniony obiekt. Po co to robić? Nie mam pewności, że dane zostaną zapisane przez usługę w taki sam sposób w jaki
                    // je wprowadziłem
                    this.snackBar.open("Produkt został zapisany", '', {duration: 3000}); // 3 sekundy się wyświetla
                },
                error: err => this.adminMessageService.addSpringErrors(err.error)
            });
        }
        // 24.20 to co się duplikuje tu w kodzie wydzielam do metody prywatnej (tylko część związana z mapowaniem, bez lambdy):
    private mapFormValues(product: AdminProductUpdate): void {
        return this.productForm.setValue({
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                currency: product.currency
            }
        )
    };
}