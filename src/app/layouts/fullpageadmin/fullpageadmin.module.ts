import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FullpageadminComponent} from "./fullpageadmin.component";
import {AdminComponent} from "../../modules/admin/admin.component";
import {RouterModule} from "@angular/router";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../../shared/shared.module";
import {MaterialModule} from "../../shared/material.module";

@NgModule({
  declarations: [
    FullpageadminComponent, // 23.1
    AdminComponent // 23.2
  ],
  imports: [
    CommonModule, // 23.3
    RouterModule, // 23.4
    FlexLayoutModule,
    SharedModule,
    MaterialModule
  ]
})
export class FullpageadminModule { }