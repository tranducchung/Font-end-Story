import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PostBlogComponent} from './user/post-blog/post-blog.component';
import {BlogComponent} from './user/blog/blog.component';
import {NotificationComponent} from './user/notification/notification.component';
import {SocketComponent} from './socket/socket.component';
import {PostAlbumImgComponent} from './user/post-album-img/post-album-img.component';
import {MyAlbumComponent} from './user/my-album/my-album.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'addBlog',
    component: PostBlogComponent
  },
  {
    path: 'listBlog',
    component: BlogComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
  {
    path: 'socket',
    component: SocketComponent

  },
  {
    path: 'addAlbum',
    component: PostAlbumImgComponent
  },
  {
    path: 'myAlbum',
    component: MyAlbumComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
