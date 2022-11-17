import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DefaultModule} from "./layouts/default/default.module";
import {FullpageModule} from "./layouts/fullpage/fullpage.module";

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent, 20.0 usuwam

    /* 19.0 usuwam:
    FullpageComponent*/

    /* 13.0 usuwam:
    HeaderComponent,
    SidebarComponent,
    FooterComponent*/

    /* 3.0 usuwam:
    DefaultComponent,
    ProductComponent,
    HomeComponent*/
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DefaultModule,
    FullpageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
