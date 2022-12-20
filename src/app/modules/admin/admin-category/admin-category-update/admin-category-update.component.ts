import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminCategoryService } from "../admin-category.service";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminMessageService } from "../../common/service/admin-message.service";
import { AdminCategory } from '../model/AdminCategory';

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.scss']
})
export class AdminCategoryUpdateComponent implements OnInit {

  // 27.1 dodaję pole:
  categoryForm!: FormGroup;

  // 27.3 wstrzykuję formBuilera i inne potem:
  constructor(private formBuilder: FormBuilder,
              private adminCategoryService: AdminCategoryService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private adminMessageService: AdminMessageService) {
  }

  ngOnInit(): void {
    // 27.4 kopiuję z admin-category-add i tu wklejam:
    this.categoryForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      description: [""], // nie ma walidacji, bo nie jest to pole wymagane
      slug: ["", [Validators.required, Validators.minLength(4)]]
    });
    this.getCategory()
  }

  // 27.5 dodaję metodę:
  getCategory() { // 27.6 potrzebuję pobrać id, pobieram z ActivatedRoute:
    this.adminCategoryService.getCategory(Number(this.route.snapshot.params['id']))
        // 27.8 dodaję subscribe:
        .subscribe(category => // 27.13 zastępuję do metodą do mapowania z dołu:
            this.mapToFormValues(category));

/*            this.categoryForm.setValue({
          name: category.name,
          description: category.description,
          slug: category.slug
        }));*/
  }

  // 27.2 dodaję metodę submit(). 27.9 Tutaj też potrzebuję pobrać id, przekazać dane i obsłużyć wynik i błędy:
  // 27.10 dodaję metodę saveProduct w serwisie
  submit() {
    this.adminCategoryService.saveProduct(Number(this.route.snapshot.params['id']), this.categoryForm.value)
        .subscribe({
          next: category => { // zaktualizuje kategorię. Tworzę nową metodę do mapowania:
            this.mapToFormValues(category);
            this.snackBar.open("Kategoria została zapisana", "", {duration: 3000})
          },
          error: err => {
            this.adminMessageService.addSpringErrors(err.error());
          }
        });
  }

  // 27.12 tworzę metodę:
  private mapToFormValues(category: AdminCategory) { // kopiuję z góry:
    this.categoryForm.setValue({
      name: category.name,
      description: category.description,
      slug: category.slug
    });
  }
}