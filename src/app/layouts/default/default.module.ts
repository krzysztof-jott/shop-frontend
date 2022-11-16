import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DefaultComponent} from "./default.component";
import {ProductComponent} from "../../modules/product/product.component";
import {HomeComponent} from "../../modules/home/home.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FlexModule} from "@angular/flex-layout";

@NgModule({
  declarations: [
    DefaultComponent,
    ProductComponent,
    HomeComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        // 12.2 żeby tag "app-footer" się wyświetlał, trzeba zaimportować moduł shared do modułu domyślnego layoutu:
        SharedModule,
        FlexModule
    ]
})
export class DefaultModule { }