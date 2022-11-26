import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AdminProductAddService} from "./admin-product-add.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-admin-product-add',
  templateUrl: './admin-product-add.component.html',
  styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {

  // 27.1 dodaję pole:
  productForm!: FormGroup; // potrzeba jeszcze metody submit(), dodaję na dole

  // 27.4 wstrzykuję formBuilder:
  constructor(private formBuilder: FormBuilder,
              // 29.2 wstrzykuję serwis:
              private adminProductAddService: AdminProductAddService,
              private router: Router, // klasa Router pozwoli na skorzystanie z metody navigate(), która przeniesie mnie
              // na inną stronę!
              // 29.5 dodaję snackbara:
              private snackBar: MatSnackBar
              ) { }

  // 27.3 konfiguruję formularz tak jak w przypadku update, kopiuję i wklejam:
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [''],
      description: [''],
      category: [''],
      price: [''],
      currency: ['PLN']
    });
  }

  // 27.2 dodaję metodę submit. Może działać podobnie jak metoda edycji, chociaż mogą byc drobne różnice. Tworzę nowy serwis:
  // 29.3 teraz dopiero coś tu wpisuję do meteody:
  submit() {
    this.adminProductAddService.saveNewProduct(this.productForm.value) // przekazuję to co będzie w formularzu
        .subscribe(product => {
          this.router.navigate(["/admin/products/update", product.id]) // 29.4 po zapisie nowego produktu
          // przeniosę się do formularza edycji nowo dodanego produktu. Wstrzykuję router.
              .then(() => this.snackBar.open("Produkt został dodany", "", {duration: 3000})) // jeśli zadziała nawigacja, to zrób coś tam
        });
// 29.5 powyżej url w navigate() będzie z parametrem id, więc trzeba podać tablicę
    // 29.6 Lambda odpali się po navigate(), czyli muszę się zasubskrybować na Promisa, którego zwraca navigate() i po evencie
    // przekierowania na nową stronę wykonuje się lambda.
  }
}
