import {Component, OnInit} from '@angular/core';
import {AlbumImg, Blog, Notification} from '../ipost';
import {UserService} from '../../service/user.service';
import {TokenService} from '../../auth/token.service';
import {ActivatedRoute, Router} from '@angular/router';
import {and} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  listNotifacation: Notification[];
  blog: Blog;
  info: any;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor(),
    };
    this.userService.getListNotification().subscribe(next => {
      this.listNotifacation = next;
      // tslint:disable-next-line:max-line-length
      console.log(next[0].userShare + 'share to you his album IMG:' + ' http://localhost:4200/notification/' + next[0].idUser + '/blogImg/' + next[0].idBlog);
      console.log(next[0].idUser + '/blog/' + next[0].idBlog);
    }, error => console.log(error));
  }

  delete(i) {
    const r = confirm('Do you delete notification');
    const blog = this.listNotifacation[i];
    if (r) {
      this.userService.deleteBlogShare(blog.id).subscribe(() => this.userService.getListNotification().subscribe(next =>
          this.listNotifacation = next, error => {
          if (error.status === 404) {
            this.listNotifacation = null;
          }
        }
        ), error => console.log(error)
      );
    }
  }
}
