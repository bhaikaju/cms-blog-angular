import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {SinglePostComponent} from './components/single-post/single-post.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { CategoryListComponent } from './components/category-list/category-list.component';
import {CookieService} from "ngx-cookie-service";
import {CustomHttpInterceptor} from "projects/frontend/src/app/interceptor/custom-http.interceptor";

// @ts-ignore
const providers = [];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SinglePostComponent,
    CategoryListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export class FrontEndModule {
  static forRoot(): ModuleWithProviders<any> {

    return {
      ngModule: AppModule,
      // @ts-ignore
      providers: providers
    }
  }
}
