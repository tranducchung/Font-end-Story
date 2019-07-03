import {Component, OnInit} from '@angular/core';
import {Blog, User} from '../ipost';
import {PostService} from '../../service/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../service/user.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {EmbedVideoService} from 'ngx-embed-video/dist';

@Component({
  selector: 'app-detail-blog',
  templateUrl: './detail-blog.component.html',
  styleUrls: ['./detail-blog.component.scss']
})
export class DetailBlogComponent implements OnInit {
  blog: Blog;
  iframe: string;
  listUser: User[];
  urlYT: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getBlogById(id).subscribe(next => {
      this.blog = next;
      console.log(next);
      console.log(next.iframe);
      this.urlYT = next.iframe;
      this.iframe = this.swapURL(this.urlYT);
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
    this.userService.shareBlog(idUser, idBlog).subscribe(next => console.log('aaa' + next), error => console.log(error));
  }

  swapURL(url: string) {
    const keyUrl: string = url.slice(32, 44);
    console.log(keyUrl);
    // tslint:disable-next-line:max-line-length
    console.log('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + keyUrl + ' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    // tslint:disable-next-line:max-line-length
    return '<iframe width="560" height="315" src="https://www.youtube.com/embed/' + keyUrl + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  }

  onDisplay() {
    document.getElementById('demo').innerHTML = this.iframe;
  }
}

