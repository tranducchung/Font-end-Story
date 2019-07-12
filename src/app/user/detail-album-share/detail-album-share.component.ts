import {Component, OnInit} from '@angular/core';
import {AlbumImg, Img} from '../ipost';
import {PostAlbumImgService} from '../../service/post-album-img.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../../auth/token.service';
import {SessionServiceService} from '../../service/session-service.service';

@Component({
  selector: 'app-detail-album-share',
  templateUrl: './detail-album-share.component.html',
  styleUrls: ['./detail-album-share.component.scss']
})
export class DetailAlbumShareComponent implements OnInit {
  album: AlbumImg;
  listImg: Img[];
  info: any;
  currentURL = '';

  constructor(
    private albumService: PostAlbumImgService,
    private router: Router,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private sessionService: SessionServiceService,
  ) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor()
    };
    const idUserShare = +this.route.snapshot.paramMap.get('idUserShare');
    const idBlogShare = +this.route.snapshot.paramMap.get('idBlogShare');
    this.albumService.getBlogImgShare(idUserShare, idBlogShare).subscribe(next => {
      this.album = next;
      this.listImg = next.listImg;
    }, error => console.log(error));
  }
  redirect() {
    this.currentURL = window.location.href;
    this.sessionService.saveLink(this.currentURL);
    this.router.navigate(['/auth/login']);
  }
}
