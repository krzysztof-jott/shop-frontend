import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullpageComponent } from "./fullpage.component";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from "../../modules/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
      FullpageComponent,
      LoginComponent
  ],
	imports: [
		CommonModule,
		RouterModule,
		SharedModule,
		FlexLayoutModule,
		ReactiveFormsModule
	]
})
export class FullpageModule { }