import {Component, OnInit} from '@angular/core';
import {Blog} from '../ipost';
import {PostService} from '../../service/post.service';
import {TokenService} from '../../auth/token.service';
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


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
  // tslint:disable-next-line:max-line-length
  // private video: SafeUrl = '<iframe width="560" height="315" src="https://www.youtube.com/embed/wIDtTB6yn8k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    private sanitizer: DomSanitizer
  ) {
    // if (typeof this.video === 'string') {
    //   this.video = this.sanitizer.bypassSecurityTrustHtml(this.video);
    // }
  }

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
}
