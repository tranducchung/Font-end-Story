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
  indexOfShow = -1;
  showButton = false;

  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    ) {}

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor(),
    };

    this.postService.getBlogs().subscribe(next => (this.blogList = next), error => (this.blogList = []));
  }

  readMore(i) {
    this.indexOfShow = i;
  }

  showContent(enable: boolean) {
    this.showButton = enable;
  }
  onChange(value) {
    this.postService.seachByTitle(value).subscribe(data => this.blogList = data, error => console.log(error) );
  }
}
