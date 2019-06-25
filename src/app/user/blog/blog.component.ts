import {Component, OnInit} from '@angular/core';
import {Blog} from '../ipost';
import {PostService} from '../../service/post.service';
import {Token} from '@angular/compiler';
import {TokenService} from '../../auth/token.service';
import {JwtResponse} from '../../auth/jwt-response';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogList: Blog[];
  info: any;
  constructor(
    private postService: PostService,
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
    this.postService.getBlogs().subscribe(next => (this.blogList = next), error => (this.blogList = []));
  }

  delete(i) {
    const blog = this.blogList[i];
    this.postService.deleteBlog(blog.id).subscribe(() =>
      this.blogList = this.blogList.filter(t => t.id !== blog.id));
  }
}
