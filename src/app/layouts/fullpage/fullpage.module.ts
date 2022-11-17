import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FullpageComponent} from "./fullpage.component";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {LoginComponent} from "../../modules/login/login.component";

@NgModule({
  declarations: [
      // 19.1 dodaję deklarację:
      FullpageComponent,
      // 20.1 dodaję deklarację:
      LoginComponent
  ],
  imports: [
    CommonModule,
  // 19.2 kopiuję importy z domyślnego layoutu:
    RouterModule,
    SharedModule,
    FlexLayoutModule
  ]
})
export class FullpageModule { }
