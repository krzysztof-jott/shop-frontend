import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminProductAddService} from "./admin-product-add.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../admin-message.service";

@Component({
        selector: 'app-admin-product-add',
        templateUrl: './admin-product-add.component.html',
        styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {

        productForm!: FormGroup; // potrzeba jeszcze metody submit(), dodaję na dole

        constructor(private formBuilder: FormBuilder,
                    private adminProductAddService: AdminProductAddService,
                    private router: Router, // klasa Router pozwoli na skorzystanie z metody navigate(), która przeniesie mnie
                    private snackBar: MatSnackBar,
                    private adminMessageService: AdminMessageService
        ) {
        }

        ngOnInit(): void {
                this.productForm = this.formBuilder.group({
                        name: ['', [Validators.required, Validators.minLength(4)]],
                        description: ['', [Validators.required, Validators.minLength(4)]],
                        fullDescription: [''],
                        category: ['', [Validators.required, Validators.minLength(4)]],
                        price: ['', [Validators.required, Validators.min(0)]], // minimalna liczba
                        currency: ['PLN', Validators.required],
                        slug: ['', [Validators.required, Validators.minLength(4)]]
                });
        }

        submit() {
                this.adminProductAddService.saveNewProduct(this.productForm.value) // przekazuję to co będzie w formularzu
                          .subscribe({
                                  next: product => {
                                          this.router.navigate(["/admin/products/update", product.id])
                                                    .then(() => this.snackBar.open("Produkt został dodany", "", {duration: 3000}));
                                  },
                                  error: err => this.adminMessageService.addSpringErrors(err.error)
                          });
        }

}
