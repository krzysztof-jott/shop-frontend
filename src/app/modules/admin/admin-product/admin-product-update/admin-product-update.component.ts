import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AdminProductUpdateService } from "./admin-product-update.service";
import { AdminProductUpdate } from "../model/adminProductUpdate";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AdminMessageService } from "../../common/service/admin-message.service";
import {AdminProductImageService} from "../admin-product-image.service";

@Component({
        selector: 'app-admin-product-update',
        templateUrl: './admin-product-update.component.html',
        styleUrls: ['./admin-product-update.component.scss']
})
export class AdminProductUpdateComponent implements OnInit {

        product!: AdminProductUpdate; // 23.6 tu dodaję to pole
        productForm!: FormGroup;
        imageForm!: FormGroup;
        requiredFilesTypes = "image/jpeg, image/png"; // tylko takie pliki będzie można dodać
        image: string | null = null;

        constructor(private router: ActivatedRoute,
                    private adminProductUpdateService: AdminProductUpdateService,
                    private formBuilder: FormBuilder,
                    private snackBar: MatSnackBar,
                    private adminMessageService: AdminMessageService,
                    private adminProductImageService: AdminProductImageService
        ) {
        }

        ngOnInit(): void {
                this.getProduct();
                this.productForm = this.formBuilder.group({ // tablica konfiguracyjna, pierwsza wartość to zawsze wartość domyślna (tutaj puste pole)
                        name: ['', [Validators.required, Validators.minLength(4)]],
                        description: ['', [Validators.required, Validators.minLength(4)]],
                        fullDescription: [''],
                        categoryId: ['', [Validators.required]], // zostawiam tylko pole wymagane
                        price: ['', [Validators.required, Validators.min(0)]],
                        currency: ['PLN', Validators.required],
                        slug: ['', [Validators.required, Validators.minLength(4)]]
                });
                this.imageForm = this.formBuilder.group({
                        file: [''],
                })
        }

        getProduct() {
                let id = Number(this.router.snapshot.params['id']);
                this.adminProductUpdateService.getProduct(id)
                        .subscribe(product => this.mapFormValues(product));
        }

        submit() {
                let id = Number(this.router.snapshot.params['id']);
                this.adminProductUpdateService.saveProduct(id, {
                        name: this.productForm.get('name')?.value, // znak ?, żeby nie było problemów z nullem
                        description: this.productForm.get('description')?.value,
                        fullDescription: this.productForm.get('fullDescription')?.value,
                        // 17.2 tu też Id dodaję
                        categoryId: this.productForm.get('categoryId')?.value,
                        price: this.productForm.get('price')?.value,
                        currency: this.productForm.get('currency')?.value,
                        image: this.image,
                        slug: this.productForm.get('slug')?.value,
                } as AdminProductUpdate)
                        .subscribe({
                                next: product => {
                                        this.mapFormValues(product);
                                        this.snackBar.open("Produkt został zapisany", '', {duration: 3000}); // 3 sekundy się wyświetla
                                },
                                error: err => this.adminMessageService.addSpringErrors(err.error)
                        });
        }

        uploadFile() {
                let formData = new FormData();
                formData.append('file', this.imageForm.get('file')?.value);
                this.adminProductImageService.uploadImage(formData)
                          .subscribe(result => this.image = result.filename);
        }

        onFileChange(event: any) {
                if (event.target.files.length > 0) {
                        this.imageForm.patchValue({
                                file: event.target.files[0] // czyli pierwszy plik jaki wybiorę
                        });
                }
        }

        private mapFormValues(product: AdminProductUpdate): void {
                this.productForm.setValue({
                        name: product.name,
                        description: product.description,
                        fullDescription: product.fullDescription,
                        // 14.0 zamiast product.category daję 1. Pole to nie jest zwracane z usługi i po wpisaniu 1 będzie się
                        // wybierać domyślna kategoria:
                        // 17.0 teraz 1 zamianiam z powrotem na product. ale z categoryId
                        categoryId: product.categoryId,
                        price: product.price,
                        currency: product.currency,
                        slug: product.slug
                        });
                this.image = product.image;
        };
}