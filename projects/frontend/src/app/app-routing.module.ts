import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {SinglePostComponent} from "./components/single-post/single-post.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'post/category/:title',
    component: HomeComponent
  },
  {
    path: 'post/detail/:slug',
    component: SinglePostComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
