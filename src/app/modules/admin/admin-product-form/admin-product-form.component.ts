import {Component, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";

// 26.x dodaję dekorator:
@Component({
    selector: 'app-admin-product-form',
    // 26.x przy wielu liniach kodu łapki muszą te pod tyldą. Wycinam szablon z admin-product-update html i wklejam tu
    // (dodaję jeszcze diva):
    template: `
            <div [formGroup]="parentForm" fxLayout="column">
                    <mat-form-field appearance="fill">
                            <mat-label>Nazwa</mat-label>
                            <input matInput placeholder="Podaj nazwę produktu" formControlName="name">
                    </mat-form-field>

                    <mat-form-field appearance="fill">
                            <mat-label>Opis</mat-label>
                            <textarea matInput rows="20" placeholder="Podaj opis produktu" formControlName="description"></textarea>
                    </mat-form-field>

                    <mat-form-field appearance="fill">
                            <mat-label>Kategoria</mat-label>
                            <input matInput placeholder="Podaj kategorię produktu" formControlName="category">
                    </mat-form-field>

                    <mat-form-field appearance="fill">
                            <mat-label>Cena</mat-label>
                            <input matInput placeholder="Podaj cenę produktu" formControlName="price">
                    </mat-form-field>

                    <mat-form-field appearance="fill">
                            <mat-label>Waluta</mat-label>
                            <input matInput placeholder="Podaj walutę" formControlName="currency">
                    </mat-form-field>

                    <div fxLayoutAlign="end">
                            <button mat-flat-button color="warn">Zapisz</button>
                    </div>
            </div>`
})

export class AdminProductFormComponent implements OnInit {

    // 26.X dodaję pole parentForm i dodaję adnotację Input:
    @Input() parentForm!: FormGroup; // dodaję teraz AdminProductFormComponent do modułu fullpageadmin.module.ts

    ngOnInit(): void {
    }
}