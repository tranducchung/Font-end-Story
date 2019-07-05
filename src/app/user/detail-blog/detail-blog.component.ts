import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Blog, User} from '../ipost';
import {PostService} from '../../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {TokenService} from '../../auth/token.service';

import {ExportAsService, ExportAsConfig} from 'ngx-export-as';
import * as printJS from 'print-js';


@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService,
    private tokenService: TokenService,
    private exportAsService: ExportAsService,
  ) {
  }

  blog: Blog;
  url_video: string;
  listUser: User[];
  info: any;
  urlYT: string;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf',
    elementId: 'pdftext',
    fileName: 'mypdf',
  };

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
      console.log(next);
      console.log(next.urlVideo);
      this.urlYT = next.urlVideo;
      this.url_video = this.swapURL(this.urlYT);
      this.onDisplay();
    }, error => {
      console.log(error);
      this.blog = null;
    });
    this.userService.getUsers().subscribe(next => (this.listUser = next), error => (this.listUser = []));
  }

  shareBlog(idUser: number, idBlog: number) {
    console.log(idUser);
    console.log(idBlog);

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
    document.getElementById('demo').innerHTML = this.url_video;
  }


  print() {
    printJS({
      printable: 'pdftext',
      type: 'html',
      targetStyles: ['*']
    });
  }
}
