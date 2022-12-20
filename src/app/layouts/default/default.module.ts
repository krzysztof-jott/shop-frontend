import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from "./default.component";
import { ProductComponent } from "../../modules/product/product.component";
import { HomeComponent } from "../../modules/home/home.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProductDetailsComponent } from "../../modules/product-details/product-details.component";
import { CategoryComponent } from "../../modules/category/category.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
        declarations: [
                DefaultComponent,
                ProductComponent,
                HomeComponent,
                ProductDetailsComponent,
                CategoryComponent
        ],
        imports: [
                CommonModule,
                RouterModule,
                SharedModule,
                FlexLayoutModule,
                ReactiveFormsModule
        ]
})
export class DefaultModule { }