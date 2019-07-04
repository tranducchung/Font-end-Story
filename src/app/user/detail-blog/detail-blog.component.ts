import {Component, OnInit} from '@angular/core';
import {Blog, User} from '../ipost';
import {PostService} from '../../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/user.service';
import {TokenService} from '../../auth/token.service';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {
  blog: Blog;
  listUser: User[];
  info: any;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor()
    };
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getBlogById(id).subscribe(next => {
      this.blog = next;
    }, error => {
      console.log(error);
      this.blog = null;
    });
    this.userService.getUsers().subscribe(next => (this.listUser = next), error => (this.listUser = []));
  }

  shareBlog(idUser: number, idBlog: number) {
    console.log(idUser);
    console.log(idBlog);
    this.userService.shareBlog(idUser, idBlog).subscribe(next => console.log('aaa' + next), error => console.log(error));
  }
}
