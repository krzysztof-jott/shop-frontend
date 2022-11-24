import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FullpageadminComponent} from "./fullpageadmin.component";
import {AdminComponent} from "../../modules/admin/admin.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material.module";
import {AdminProductsComponent} from "../../modules/admin/admin-product/admin-product.component";

@NgModule({
  declarations: [
    FullpageadminComponent,
    AdminComponent,
    AdminProductsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    MaterialModule
  ]
})
export class FullpageadminModule { }