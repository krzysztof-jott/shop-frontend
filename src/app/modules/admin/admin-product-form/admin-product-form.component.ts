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
						    <!--                            40.0 dodaję diva, musi pojawiać się w odpowiednim momencie czyli kiedy pole nie będzie zwalidowane:-->
						    <!--                            40.1 trzeba sprawić, żeby name pojawił się w aplikacji (jest na czerwono), dodję na dole gettera:-->
						    <!--                            40.2 jest kolejny błąd z invalid. Dodaję znak ? i część z &&:-->
						    <div *ngIf="name?.invalid && (name?.dirty || name?.touched)" class="errorMessages">
								    <!--                                    40.3 wyświetlam komunikaty  błędach:-->
								    <div *ngIf="name?.errors?.['required']">
										    Nazwa jest wymagana
								    </div>
<!--                                    LENGTH Z MAŁEJ LITERY!!!-->
								    <div *ngIf="name?.errors?.['minlength']">
										    Nazwa musi mieć przynajmniej 4 znaki
								    </div>
						    </div>
				    </mat-form-field>

				    <mat-form-field appearance="fill">
						    <mat-label>Opis</mat-label>
						    <textarea matInput rows="20" placeholder="Podaj opis produktu"
						              formControlName="description"></textarea>
						    <div *ngIf="description?.invalid && (description?.dirty || description?.touched)" class="errorMessages">
								    <!--                                    40.3 wyświetlam komunikaty  błędach:-->
								    <div *ngIf="description?.errors?.['required']">
										    Opis jest wymagany
								    </div>
								    <div *ngIf="description?.errors?.['minlength']">
										    Opis musi mieć przynajmniej 4 znaki
								    </div>
						    </div>
				    </mat-form-field>

				    <mat-form-field appearance="fill">
						    <mat-label>Kategoria</mat-label>
						    <input matInput placeholder="Podaj kategorię produktu" formControlName="category">
						    <div *ngIf="category?.invalid && (category?.dirty || category?.touched)" class="errorMessages">
								    <!--                                    40.3 wyświetlam komunikaty  błędach:-->
								    <div *ngIf="category?.errors?.['required']">
										    Kategoria jest wymagana
								    </div>
								    <div *ngIf="category?.errors?.['minlength']">
										    Kategoria musi mieć przynajmniej 4 znaki
								    </div>
						    </div>
				    </mat-form-field>

				    <mat-form-field appearance="fill">
						    <mat-label>Cena</mat-label>
						    <input matInput placeholder="Podaj cenę produktu" formControlName="price">
						    <div *ngIf="price?.invalid && (price?.dirty || price?.touched)" class="errorMessages">
								    <!--                                    40.3 wyświetlam komunikaty  błędach:-->
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
								    <!--                                    40.3 wyświetlam komunikaty  błędach:-->
								    <div *ngIf="currency?.errors?.['required']">
										    Waluta jest wymagana
								    </div>
						    </div>
				    </mat-form-field>

				    <div fxLayoutAlign="end">
						    <!--38.1 dodaję dyrektywę i teraz w formularzu dodawania guzik zapisz podświetli się dopiero po wypełnieniu wszystkich pól obowiązkowych:-->
						    <button mat-flat-button color="warn" [disabled]="!parentForm.valid">Zapisz</button>
				    </div>
		    </div>`,
    // 40.4 ostylowuję komunikaty i dodaję go w klasie w każdym divie powyżej:
    styles: [`
    .errorMessages{
        color: red;
    }`]
})

export class AdminProductFormComponent implements OnInit {

    // 26.X dodaję pole parentForm i dodaję adnotację Input:
    @Input() parentForm!: FormGroup; // dodaję teraz AdminProductFormComponent do modułu fullpageadmin.module.ts

    ngOnInit(): void {
    }

    // 40.X dodaję gettery, inaczej pola z divów wyżej nie będą działać:
    get name() {
        return this.parentForm.get("name");
    }
    get description() {
        return this.parentForm.get("description");
    }
    get category() {
        return this.parentForm.get("category");
    }
    get price() {
        return this.parentForm.get("price");
    }
    get currency() {
        return this.parentForm.get("currency");
    }
}