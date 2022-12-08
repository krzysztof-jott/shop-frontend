import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AdminProductUpdateService } from "./admin-product-update.service";
import { AdminProductUpdate } from "./model/adminProductUpdate";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminMessageService } from "../admin-message.service";

@Component({
        selector: 'app-admin-product-update',
        templateUrl: './admin-product-update.component.html',
        styleUrls: ['./admin-product-update.component.scss']
})
export class AdminProductUpdateComponent implements OnInit {

        product!: AdminProductUpdate; // 23.6 tu dodaję to pole
        productForm!: FormGroup; // 24.1 pole typu FormGroup (definicja dla formularza, może być ich więcej) (! żeby TypeScript
        // nie zgłaszał błędu)
        // 6.1UP dodaję 2 brakujące pola:
        imageForm!: FormGroup;
        requiredFilesTypes = "image/jpeg, image/png"; // tylko takie pliki będzie można dodać
        // 9.7 dodaję pole image:
        image: string | null = null; // 9.8 null, bo może tego nie być przy tworzeniu/edytowaniu produktu. Żeby wypełnić to pole
        // po uploadzie, muszę w metodzie subscribe() przypisać to co otrzymam (result)


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
        ) {
        }

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
                });
                // 7.0UP konfiguruję formularz:
                this.imageForm = this.formBuilder.group({
                        // 7.1 konfiguracja pola file:
                        file: [''],
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
                        // 9.10UP dodaję pole image (dodaję też to pole w AdminProductUpdate) i przechodzę do metody mapFromValues:
                        image: this.image
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

        // 6.0UP dodaję metody uploadFile i onFileChange:
// 9.0UP implementuję metodę. Korzystam ze specjalnej klasy FormData, która pozwoli wysłać plik (bajty) do usługi:
        uploadFile() {
                let formData = new FormData();
                // 9.1UP ustawiam pod jakim kluczem/etykietą chcę mieć te bajty w strumieniu, który przesyłam do usługi (wartość
                // file ustawione na backendzie:
                formData.append('file', this.imageForm.get('file')?.value);
                // 9.2UP jak już mam formData, wystarczy, że przekażę go do klienta http i wyślę do odpowiedniej usługi. Korzystam
                // z serwisu i tworzę nową metodę:
                this.adminProductUpdateService.uploadImage(formData)
                        .subscribe(result => this.image = result.filename); // 9.8UP przypisuję to co otrzymałem
                // do metody subscribe (czyli result)
                // 9.9UP pozostało jeszcze ustawienie pola image w odpowiednich miejscach, tak żeby zostało zapisane, najpierw
                // w metodzie submit(), bo będę chciał je wysłać do backendu, żeby po zapisaniu formularza edycji, zapisał się
                // też obraz
        }

        // 8.0UP implementuję metodę. Będzie odpalana po tym, jak doda się plik do upload (guzik wybierz plik). Ustawiam pole file:
        onFileChange(event: any) {
                // 8.1UP dodaję sprawdzenie, czy faktycznie został wybrany jakiś plik, czyli jak rozmiar tablicy jest > 0 to ustawiam
                // pole file w formularzu:
                if (event.target.files.length > 0) {
                        this.imageForm.patchValue({
                                file: event.target.files[0] // czyli pierwszy plik jaki wybiorę
                        });
                }
        }

        // 24.20 to co się duplikuje tu w kodzie wydzielam do metody prywatnej (tylko część związana z mapowaniem, bez lambdy):
        private mapFormValues(product: AdminProductUpdate): void {
                this.productForm.setValue({
                        name: product.name,
                        description: product.description,
                        category: product.category,
                        price: product.price,
                        currency: product.currency,
                        // 9.12UP tutaj też dodaję to pole i przechodzę do szablonu html. JEDNAK NIE MA GO BYĆ:
                        // image: this.image,
                        });
                this.image = product.image;
        };
}