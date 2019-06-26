import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user.component';
import {BlogComponent} from './blog/blog.component';
import {EditBlogComponent} from './edit-blog/edit-blog.component';
import {DetailBlogComponent} from './detail-blog/detail-blog.component';
import {BlogManagementComponent} from './blog-management/blog-management.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'blogManagement/:id/edit',
    component: EditBlogComponent
  },
  {
    path: 'listBlog/:id/detail',
    component: DetailBlogComponent
  },
  {
    path: 'blogManagement',
    component: BlogManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
