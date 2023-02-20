import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../../shared/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AdminLoginComponent } from "../../modules/admin/admin-login/admin-login.component";
import { FullpageadminemptyComponent } from "./fullpageadminempty.component";

@NgModule({
	declarations: [
		FullpageadminemptyComponent,
		AdminLoginComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		FlexLayoutModule,
		MaterialModule,
		ReactiveFormsModule
	]
})
export class FullpageadminemptyModule { }