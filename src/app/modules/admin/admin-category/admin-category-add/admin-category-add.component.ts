import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminCategoryService } from "../admin-category.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminMessageService } from "../../common/service/admin-message.service";

@Component({
    selector: 'app-admin-category-add',
    templateUrl: './admin-category-add.component.html',
    styleUrls: ['./admin-category-add.component.scss']
})
export class AdminCategoryAddComponent implements OnInit {

    // 23.1 dodaję brakujące pole:
    categoryForm!: FormGroup;

    // 23.3 wstrzykuję Buildera:
    constructor(private formBuilder: FormBuilder,
                // 25.1 wstrzykuję serwis:
                private adminCategoryService: AdminCategoryService,
                // 26.3 wstrzykuję router, żeby zrobić przekierowanie:
                private router: Router,
                private snackBar: MatSnackBar,
                // 26.6 wstrzykuję serwis:
                private adminMessageService: AdminMessageService) {
    }

    // robię definicję formularza kategorii:
    ngOnInit(): void {
        this.categoryForm = this.formBuilder.group({
            name: ["", [Validators.required, Validators.minLength(4)]],
            description: [""], // nie ma walidacji, bo nie jest to pole wymagane
            slug: ["", [Validators.required, Validators.minLength(4)]],
        })
    }

    // 25.0 tworzę metodę submit()
    submit() {
        this.adminCategoryService.createCategory(this.categoryForm.value) // czyli te 3 pola powyżej
            // 26.2 dodaję subscribe z obsługą błędów:
            .subscribe({
                next: category => { // 26.4 tu po dodaniu kategorii robię przekierowanie:
                    this.router.navigate(["/admin/categories"])
                        .then(() => this.snackBar.open('Kategoria została dodana', '', {duration: 3000}))
                },
                error: err => { // 26.5 a do obługi błędów potrzebuję adminMessageService:
                    this.adminMessageService.addSpringErrors(err.error());
                }
            });
    }
}