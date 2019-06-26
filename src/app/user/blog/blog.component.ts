import {Component, OnInit} from '@angular/core';
import {Blog} from '../ipost';
import {PostService} from '../../service/post.service';
import {TokenService} from '../../auth/token.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogList: Blog[];
  info: any;
  showContent = false;

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

  showContents(enable: boolean) {
    this.showContent = enable;
  }
}
