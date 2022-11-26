import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FullpageadminComponent} from "./fullpageadmin.component";
import {AdminComponent} from "../../modules/admin/admin.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material.module";
import {AdminProductsComponent} from "../../modules/admin/admin-product/admin-product.component";
import {AdminProductUpdateComponent} from "../../modules/admin/admin-product-update/admin-product-update.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AdminProductAddComponent} from "../../modules/admin/admin-product-add/admin-product-add.component";
import {AdminProductFormComponent} from "../../modules/admin/admin-product-form/admin-product-form.component";

@NgModule({
    declarations: [
        FullpageadminComponent,
        AdminComponent,
        AdminProductsComponent,
        AdminProductUpdateComponent,
        AdminProductAddComponent,
        AdminProductFormComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FlexLayoutModule,
        SharedModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class FullpageadminModule { }