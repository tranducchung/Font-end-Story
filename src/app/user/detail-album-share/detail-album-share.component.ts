import {Component, OnInit} from '@angular/core';
import {AlbumImg, Img} from '../ipost';
import {PostAlbumImgService} from '../../service/post-album-img.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail-album-share',
  templateUrl: './detail-album-share.component.html',
  styleUrls: ['./detail-album-share.component.scss']
})
export class DetailAlbumShareComponent implements OnInit {
  album: AlbumImg;
  listImg: Img[];

  constructor(
    private albumService: PostAlbumImgService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    const idUserShare = +this.route.snapshot.paramMap.get('idUserShare');
    const idBlogShare = +this.route.snapshot.paramMap.get('idBlogShare');
    this.albumService.getBlogImgShare(idUserShare, idBlogShare).subscribe(next => {
      this.album = next;
      this.listImg = next.listImg;
    }, error => console.log(error));
  }

}
