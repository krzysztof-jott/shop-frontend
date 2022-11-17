import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultComponent} from "./layouts/default/default.component";
import {HomeComponent} from "./modules/home/home.component";
import {ProductComponent} from "./modules/product/product.component";
import {FullpageComponent} from "./layouts/fullpage/fullpage.component";
import {LoginComponent} from "./modules/login/login.component";
import {FullpageadminComponent} from "./layouts/fullpageadmin/fullpageadmin.component";
import {AdminComponent} from "./modules/admin/admin.component";

// 6.0 ten moduł odpowiada za ścieżki aplikacji
const routes: Routes = [
  {
    path: '', component: DefaultComponent, children: [ // 6.1 children będą korzystać z domyślnego komponentu
      {path: '', component: HomeComponent}, // 6.2 konfiguruję stronę główną (pusta ścieżka dla niej)
      {path: 'products', component: ProductComponent}
    ]
  },
    // 20.2 dodaję konfigurację dla podstrony do logowania:
  {
    path: '', component: FullpageComponent, children: [
      {path: 'login', component: LoginComponent}
    ]
  },
    // 23.6 dodaję routing dla panelu administracyjnego:
  {
    path: '', component: FullpageadminComponent, children: [
      {path: 'admin', component: AdminComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
