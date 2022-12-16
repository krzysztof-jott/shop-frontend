import { Component, Input, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AdminCategoryNameDto } from "../common/dto/AdminCategoryNameDto";
import { FormCategoryService } from "./form-category.service";

@Component({
    selector: 'app-admin-product-form',
    template: `
        <div [formGroup]="parentForm" fxLayout="column">
            <mat-form-field appearance="fill">
                <mat-label>Nazwa</mat-label>
                <input matInput placeholder="Podaj nazwę produktu" formControlName="name">
                <div *ngIf="name?.invalid && (name?.dirty || name?.touched)" class="errorMessages">
                    <div *ngIf="name?.errors?.['required']">
                        Nazwa jest wymagana
                    </div>
                    <div *ngIf="name?.errors?.['minlength']">
                        Nazwa musi mieć przynajmniej 4 znaki
                    </div>
                </div>
            </mat-form-field>
            
            <mat-form-field appearance="fill">
                <mat-label>Przyjazny url</mat-label>
                <input matInput placeholder="Podaj url" formControlName="slug">
                <div *ngIf="slug?.invalid && (slug?.dirty || slug?.touched)" class="errorMessages">
                    <div *ngIf="slug?.errors?.['required']">
                        Nazwa jest wymagana
                    </div>
                    <div *ngIf="slug?.errors?.['minlength']">
                        Nazwa musi mieć przynajmniej 4 znaki
                    </div>
                </div>
            </mat-form-field>
            
            <mat-form-field appearance="fill">
                <mat-label>Opis</mat-label>
                <textarea matInput rows="2" placeholder="Podaj opis produktu" formControlName="description"></textarea>
                <div *ngIf="description?.invalid && (description?.dirty || description?.touched)" class="errorMessages">
                    <div *ngIf="description?.errors?.['required']">
                        Opis jest wymagany
                    </div>
                    <div *ngIf="description?.errors?.['minlength']">
                        Opis musi mieć przynajmniej 4 znaki
                    </div>
                </div>
            </mat-form-field>

            <mat-form-field appearance="fill">
                <mat-label>Pełny opis</mat-label>
                <textarea matInput rows="4" placeholder="Podaj pełny opis produktu" formControlName="fullDescription"></textarea>
            </mat-form-field>
            
            <mat-form-field appearance="fill">
                <mat-label>Kategoria</mat-label>
<!--                17.3 tu też dodaję Id do category i poprawiam getter:-->
                <mat-select formControlName="categoryId">
<!--                    12.0 dodaję na samym dole w klasie tablicę:-->
                    <mat-option *ngFor="let el of categories" [value]="el.id">
                        {{el.name}}
                    </mat-option>
                </mat-select>
                <div *ngIf="categoryId?.invalid && (categoryId?.dirty || categoryId?.touched)" class="errorMessages">
                    <div *ngIf="categoryId?.errors?.['required']">
                        Kategoria jest wymagana
                    </div>
<!--17.X usuwam walidację                    <div *ngIf="categoryId?.errors?.['minlength']">
                        Kategoria musi mieć przynajmniej 4 znaki
                    </div>-->
                </div>
            </mat-form-field>
            
            <mat-form-field appearance="fill">
                <mat-label>Cena</mat-label>
                <input matInput placeholder="Podaj cenę produktu" formControlName="price">
                <div *ngIf="price?.invalid && (price?.dirty || price?.touched)" class="errorMessages">
                    <div *ngIf="price?.errors?.['required']">
                        Cena jest wymagana
                    </div>
                    <div *ngIf="price?.errors?.['min']">
                        Cena musi być większa od zera
                    </div>
                </div>
            </mat-form-field>

            <mat-form-field appearance="fill">
                <mat-label>Waluta</mat-label>
                <input matInput placeholder="Podaj walutę" formControlName="currency">
                <div *ngIf="currency?.invalid && (currency?.dirty || currency?.touched)" class="errorMessages">
                    <div *ngIf="currency?.errors?.['required']">
                        Waluta jest wymagana
                    </div>
                </div>
            </mat-form-field>

            <div fxLayoutAlign="end">
                <button mat-flat-button color="warn" [disabled]="!parentForm.valid">Zapisz</button>
            </div>
        </div>`,

    styles: [`
        .errorMessages {
            color: red;
        }`]
})

export class AdminProductFormComponent implements OnInit {

    @Input() parentForm!: FormGroup;

    // 12.1 dodaję tablicę (póki co pusta):
    categories: Array<AdminCategoryNameDto> = [];

    // 14.0 dodaję konstruktor:
    constructor(private formCategoryService: FormCategoryService) {
    }

    // 14.2 i wywołuję ją
    ngOnInit(): void {
        this.getCategories();
    }

    // 14.1 tworzę metodę, która pobierze kategorie:
    getCategories() {
        this.formCategoryService.getCategories()
            .subscribe(categories => this.categories = categories)
    }

    get name() {
        return this.parentForm.get("name");
    }
    get description() {
        return this.parentForm.get("description");
    }
    get fullDescription() {
        return this.parentForm.get("fullDescription");
    }
    get categoryId() {
        return this.parentForm.get("categoryId");
    }
    get price() {
        return this.parentForm.get("price");
    }
    get currency() {
        return this.parentForm.get("currency");
    }
    get slug() {
        return this.parentForm.get("slug");
    }
}