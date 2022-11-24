import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultComponent} from "./layouts/default/default.component";
import {HomeComponent} from "./modules/home/home.component";
import {ProductComponent} from "./modules/product/product.component";
import {FullpageComponent} from "./layouts/fullpage/fullpage.component";
import {LoginComponent} from "./modules/login/login.component";
import {FullpageadminComponent} from "./layouts/fullpageadmin/fullpageadmin.component";
import {AdminComponent} from "./modules/admin/admin.component";
import {AdminProductsComponent} from "./modules/admin/admin-product/admin-product.component";

// 6.0 ten moduł odpowiada za ścieżki aplikacji
const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [
      {path: '', component: HomeComponent},
      {path: 'products', component: ProductComponent}
    ]
  },

  {
    path: '', component: FullpageComponent, children: [
      {path: 'login', component: LoginComponent}
    ]
  },

  {
    path: '', component: FullpageadminComponent, children: [
      {path: 'admin', component: AdminComponent},
      // 8.0 dodaję routing:
      {path: 'admin/products', component: AdminProductsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }