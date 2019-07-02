import {Component, OnInit} from '@angular/core';
import {Blog} from '../ipost';
import {PostService} from '../../service/post.service';
import {Router} from '@angular/router';
import {TokenService} from '../../auth/token.service';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.scss']
})
export class BlogManagementComponent implements OnInit {
  listBlog: Blog[];
  info: any;

  constructor(
    private postService: PostService,
    private router: Router,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    this.postService.getBlogs().subscribe(next =>
      (this.listBlog = next), error => (this.listBlog = []));
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor()
    };
  }

  delete(i) {
    const r = confirm('Do you want delete this blog?');
    if (r) {
      const blog = this.listBlog[i];
      this.postService.deleteBlog(blog.id).subscribe(() => {
        this.postService.getBlogs().subscribe(next => {
          this.listBlog = next;
        }, err => {
          if (err.status === 404) {
            this.listBlog = null;
          }
        });
      }, error => console.log(error));
    }
  }
}
