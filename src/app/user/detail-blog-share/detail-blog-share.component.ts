import { Component, OnInit } from '@angular/core';
import {Blog} from '../ipost';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-detail-blog-share',
  templateUrl: './detail-blog-share.component.html',
  styleUrls: ['./detail-blog-share.component.scss']
})
export class DetailBlogShareComponent implements OnInit {
  blog: Blog;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    const idUser = +this.route.snapshot.paramMap.get('idUser');
    const idBlog = +this.route.snapshot.paramMap.get('idBlog');
    console.log(idUser);
    console.log(idBlog);
    this.userService.getBlogShare(idUser, idBlog).subscribe(next => this.blog = next, error => console.log(error) );
  }

}
