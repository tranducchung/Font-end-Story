import {Component, OnInit} from '@angular/core';
import {Blog, User} from '../ipost';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {TokenService} from '../../auth/token.service';
import {SessionServiceService} from '../../service/session-service.service';

@Component({
  selector: 'app-detail-blog-share',
  templateUrl: './detail-blog-share.component.html',
  styleUrls: ['./detail-blog-share.component.scss']
})
export class DetailBlogShareComponent implements OnInit {
  blog: Blog;
  info: any;
  currentURL = '';
  // tslint:disable-next-line:variable-name
  url_video: string;
  listUser: User[];
  urlYT: string;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService,
    private sessionService: SessionServiceService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor()
    };
    const idUser = +this.route.snapshot.paramMap.get('idUser');
    const idBlog = +this.route.snapshot.paramMap.get('idBlog');
    console.log(idUser);
    console.log(idBlog);
    this.userService.getBlogShare(idUser, idBlog).subscribe(next => {
      this.blog = next;
      this.urlYT = next.urlVideo;
      console.log(this.urlYT);
      this.url_video = this.swapURL(this.urlYT);
      this.onDisplay();
    } , error => console.log(error));
  }

  redirect() {
    this.currentURL = window.location.href;
    this.sessionService.saveLink(this.currentURL);
    this.router.navigate(['/auth/login']);
  }

  swapURL(url: string) {
    const keyUrl: string = url.slice(32, 44);
    console.log(keyUrl);
    // tslint:disable-next-line:max-line-length
    console.log('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + keyUrl + '' +
      ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    // tslint:disable-next-line:max-line-length
    return '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + keyUrl +
      '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }
  onDisplay() {
    document.getElementById('demo1').innerHTML = this.url_video;
  }
}
