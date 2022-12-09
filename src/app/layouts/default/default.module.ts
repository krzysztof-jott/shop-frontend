import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from "./default.component";
import {ProductComponent} from "../../modules/product/product.component";
import {HomeComponent} from "../../modules/home/home.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {ProductDetailsComponent} from "../../modules/product-details/product-details.component";

@NgModule({
        declarations: [
                DefaultComponent,
                ProductComponent,
                HomeComponent,
                ProductDetailsComponent
        ],
    imports: [
        CommonModule,
        RouterModule,
        // 12.2 żeby tag "app-footer" się wyświetlał, trzeba zaimportować moduł shared do modułu domyślnego layoutu:
        SharedModule,
        FlexLayoutModule,
        MatCardModule,
        MatPaginatorModule
    ]
})
export class DefaultModule { }