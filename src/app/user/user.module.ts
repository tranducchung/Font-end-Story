import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BlogComponent} from './blog/blog.component';
import {EditBlogComponent} from './edit-blog/edit-blog.component';
import {PostBlogComponent} from './post-blog/post-blog.component';
import {CKEditorModule} from 'ckeditor4-angular';


@NgModule({
  declarations: [UserComponent, BlogComponent, EditBlogComponent, PostBlogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  exports: [UserComponent]
})
export class UserModule {
}
