import {Component, OnInit} from '@angular/core';
import {AlbumImg, Img, User} from '../ipost';
import {ActivatedRoute} from '@angular/router';
import {PostAlbumImgService} from '../../service/post-album-img.service';
import {UserService} from '../../service/user.service';
import {TokenService} from '../../auth/token.service';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.scss']
})
export class AlbumDetailComponent implements OnInit {
  album: AlbumImg;
  listImg: Img[];
  listUser: User[];
  checkShareGmail = false;
  checkShareBlog = false;
  info: any;
  listUserDisplay: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private albumService: PostAlbumImgService,
    private userService: UserService,
    private tokenService: TokenService,
  ) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor()
    };
    const id = +this.route.snapshot.paramMap.get('id');
    this.albumService.getBlogImgById(id).subscribe(next => {
        console.log(next);
        console.log(next.listImg);
        this.album = next;
        this.listImg = next.listImg;
      }, error => {
        console.log(error);
        this.album = null;
      }
    );
    this.userService.getUsers().subscribe(next => {
      this.listUser = next;
      this.checkDuplicateUser(this.listUser, this.listUserDisplay);
    }, error => (this.listUser = []));
  }

  checkDuplicateUser(listUser: User[], listUserDisplay: User[]): any {
    for (let i = 0; i < listUser.length; i++) {
      if (listUser[i].email !== this.tokenService.getEmail()) {
        listUserDisplay.push(listUser[i]);
      }
    }
    console.log(listUserDisplay);
    return this.listUserDisplay;
  }

  shareBlog(idUser: number, idAlbum: number) {
    this.userService.shareBlogImgSystem(idUser, idAlbum).subscribe(next => {
      this.checkShareBlog = true;
      this.checkShareGmail = false;
    }, error => console.log(error));
  }

  shareBlogByGmail(idUser: number, idAlbum: number) {
    this.userService.shareBlogImgGmail(idUser, idAlbum).subscribe(() => {
      this.checkShareBlog = false;
      this.checkShareGmail = true;
    }, error => console.log(error));
  }
}
