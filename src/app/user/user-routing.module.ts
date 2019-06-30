import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user.component';
import {EditBlogComponent} from './edit-blog/edit-blog.component';
import {DetailBlogComponent} from './detail-blog/detail-blog.component';
import {BlogManagementComponent} from './blog-management/blog-management.component';
import {BlogShareComponent} from './blog-share/blog-share.component';

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
  },
  {
    path: 'share/:id',
    component: BlogShareComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class UserRoutingModule { }
