import {ModuleWithProviders, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './Components/dashboard/dashboard.component';
import {LoginComponent} from './Components/login/login.component';
import {RegisterComponent} from './Components/register/register.component';
import {PostsComponent} from './Components/posts/posts.component';
import {NewPostComponent} from './Components/posts/new-post/new-post.component';
import {EditPostComponent} from './Components/posts/edit-post/edit-post.component';
import {HeaderComponent} from './Components/header/header.component';
import {FooterComponent} from './Components/footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TableModule} from "primeng/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CategoryComponent} from './Components/category/category.component';
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {ProgressBarModule} from "primeng/progressbar";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {EditorModule} from "@tinymce/tinymce-angular";
import {CustomHttpInterceptor} from "projects/frontend/src/app/interceptor/custom-http.interceptor";
import { AllPostComponent } from './Components/posts/all-post/all-post.component';
import { MainComponent } from './Components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    PostsComponent,
    NewPostComponent,
    EditPostComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    AllPostComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    TabViewModule,
    InputTextModule,
    InputTextareaModule,
    ProgressBarModule,
    ToastModule,
    FormsModule,
    ButtonModule,
    EditorModule
  ],
  providers: [
    MessageService,
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

export class AdminModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AppModule,
      providers: []
    }
  }
}

