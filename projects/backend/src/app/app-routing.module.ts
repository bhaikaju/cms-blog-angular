import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "projects/backend/src/app/Components/dashboard/dashboard.component";
import {LoginComponent} from "projects/backend/src/app/Components/login/login.component";
import {RegisterComponent} from "projects/backend/src/app/Components/register/register.component";
import {PostsComponent} from "projects/backend/src/app/Components/posts/posts.component";
import {NewPostComponent} from "projects/backend/src/app/Components/posts/new-post/new-post.component";
import {EditPostComponent} from "projects/backend/src/app/Components/posts/edit-post/edit-post.component";
import {AuthGuard} from "projects/tools/src/lib/guards/auth.guard";
import {CategoryComponent} from "projects/backend/src/app/Components/category/category.component";
import {MainComponent} from "projects/backend/src/app/Components/main/main.component";
import {AdminGuard} from "projects/tools/src/lib/guards/admin.guard";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'posts',
        children: [
          {
            path: '',
            component: PostsComponent
          },
          {
            path: 'categories',
            component: CategoryComponent
          },
          {
            path: 'create',
            component: NewPostComponent
          },
          {
            path: 'edit/:slug',
            component: EditPostComponent
          },
          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full'
          }
        ]
      },
    ]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
