import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminProductAddService} from "./admin-product-add.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AdminMessageService} from "../admin-message.service";
import {AdminProductUpdate} from "../admin-product-update/model/adminProductUpdate";
import {AdminProductUpdateService} from "../admin-product-update/admin-product-update.service";

@Component({
        selector: 'app-admin-product-add',
        templateUrl: './admin-product-add.component.html',
        styleUrls: ['./admin-product-add.component.scss']
})
export class AdminProductAddComponent implements OnInit {

        productForm!: FormGroup; // potrzeba jeszcze metody submit(), dodaję na dole
        imageForm!: FormGroup;
        requiredFilesTypes = "image/jpeg, image/png";
        image: string | null = null;

        constructor(private formBuilder: FormBuilder,
                    private adminProductAddService: AdminProductAddService,
                    private router: Router, // klasa Router pozwoli na skorzystanie z metody navigate(), która przeniesie mnie
                    private snackBar: MatSnackBar,
                    private adminMessageService: AdminMessageService,
                    private adminProductUpdateService: AdminProductUpdateService // nie wiem po co on to ma
        ) {
        }

        ngOnInit(): void {
                this.productForm = this.formBuilder.group({
                        name: ['', [Validators.required, Validators.minLength(4)]],
                        description: ['', [Validators.required, Validators.minLength(4)]],
                        fullDescription: [''],
                        categoryId: ['', [Validators.required]], // zostawiam tylko pole wymagane
                        price: ['', [Validators.required, Validators.min(0)]], // minimalna liczba
                        currency: ['PLN', Validators.required],
                        slug: ['', [Validators.required, Validators.minLength(4)]]
                });
                this.imageForm = this.formBuilder.group({
                        file: [''],
                })
        }

        submit() {
                this.adminProductAddService.saveNewProduct({
                        name: this.productForm.get('name')?.value, // znak ?, żeby nie było problemów z nullem
                        description: this.productForm.get('description')?.value,
                        fullDescription: this.productForm.get('fullDescription')?.value,
                        categoryId: this.productForm.get('categoryId')?.value,
                        price: this.productForm.get('price')?.value,
                        currency: this.productForm.get('currency')?.value,
                        image: this.image,
                        slug: this.productForm.get('slug')?.value,
                } as AdminProductUpdate)
                          .subscribe({
                                  next: product => {
                                          this.router.navigate(["/admin/products/update", product.id])
                                                    .then(() => this.snackBar.open("Produkt został dodany", "", {duration: 3000}));
                                  },
                                  error: err => this.adminMessageService.addSpringErrors(err.error)
                          });
        }

        uploadFile() {
                let formData = new FormData();
                formData.append('file', this.imageForm.get('file')?.value);
                this.adminProductAddService.uploadImage(formData)
                          .subscribe(result => this.image = result.filename);
        }

        onFileChange(event: any) {
                if (event.target.files.length > 0) {
                        this.imageForm.patchValue({
                                file: event.target.files[0] // czyli pierwszy plik jaki wybiorę
                        });
                }
        }
}