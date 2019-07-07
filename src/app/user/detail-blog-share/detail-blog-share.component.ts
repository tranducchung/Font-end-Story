import { Component, OnInit } from '@angular/core';
import {Blog} from '../ipost';
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
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService,
    private sessionService: SessionServiceService,
    private router: Router,
  ) { }

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
    this.userService.getBlogShare(idUser, idBlog).subscribe(next => this.blog = next, error => console.log(error) );
  }
  redirect() {
    this.sessionService.saveLink('http://localhost:4200/notification/1/blog/2');
    this.router.navigate(['/auth/login']);
  }
}
