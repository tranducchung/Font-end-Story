import {Component, OnInit} from '@angular/core';
import {TokenService} from '../auth/token.service';
import {JwtResponse} from '../auth/jwt-response';
import {PostService} from '../service/post.service';
import {Blog} from '../user/ipost';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info: any;
  listBlog: Blog[];
  indexOfShow = -1;
  showButton = false;

  constructor(private tokenService: TokenService,
              private postService: PostService
  ) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor()
    };
    if (this.swapURL(window.location.href) !== '') {
      this.postService.getBlogByHashTag(this.swapURL(window.location.href)).subscribe(next => {
        this.listBlog = next;
        console.log(this.listBlog);
        }
        , error => console.log('aaaa' + error.message));
    } else {
      this.postService.getAllBlogByAllUser().subscribe(next => this.listBlog = next, error => console.log(error));
    }
    // this.postService.getBlogByHashTag('VHTM').subscribe(next => this.listBlog = next, error => console.log(error) );
  }

  readMore(i) {
    this.indexOfShow = i;
  }

  showContent(enable: boolean) {
    this.showButton = enable;
  }

  swapURL(homeURL: string) {
    const hashTag: string = homeURL.slice(27, 100);
    console.log(hashTag);
    return hashTag;
  }
}
