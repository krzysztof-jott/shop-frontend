import { Component, OnInit } from '@angular/core';
import { ProductDetails } from "./model/productDetails";
import { ProductDetailsService } from "./product-details.service";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Review } from "./model/review";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: ProductDetails;
  // 45.2 dodaję pole z szablonu:
  reviewForm!: FormGroup;

  constructor(
          private productDetailsService: ProductDetailsService,
          private router: ActivatedRoute,
          // 45.4 wstrzykuję Buildera:
          private formBuilder: FormBuilder,
          private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getProductDetails();
  //  45.5 inicjuję formularz:
    this.reviewForm = this.formBuilder.group({
      // definicja formularza:
      authorName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      content: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(600)]]
    });
  }

  getProductDetails() {
    let slug = this.router.snapshot.params['slug'];
     this.productDetailsService.getProductDetails(slug)
              .subscribe(product => this.product = product);
  }

  // 46.0 zapisuję komentarz:
  submit() {
    // 46.2 jeśli jest zwalidowany:
    if (this.reviewForm.valid) {
      this.productDetailsService.saveProductReview({
        authorName: this.reviewForm.get("authorName")?.value, // pole może być puste więc potrzebny znak zapytania
        content: this.reviewForm.get("content")?.value,
        productId: this.product.id
      } as Review).subscribe(review => {
        this.reviewForm.reset();
        this.snackBar.open("Dziękujemy za dodanie opinii", "", {duration: 3000, panelClass: "snack-bar-bg-color-ok"});
      });
    }
  }

  // 45.3 dodaję gettery:
  get authorName() {
    return this.reviewForm.get('authorName');
  }

  get content() {
    return this.reviewForm.get('content');
  }
}