import { Component, OnInit } from '@angular/core';
import {AlbumImg, Img} from '../ipost';
import {PostAlbumImgService} from '../../service/post-album-img.service';

@Component({
  selector: 'app-my-album',
  templateUrl: './my-album.component.html',
  styleUrls: ['./my-album.component.scss']
})
export class MyAlbumComponent implements OnInit {
  listAlbum: AlbumImg[];
  constructor(
    private albumService: PostAlbumImgService
  ) { }

  ngOnInit() {
    this.albumService.getAllBlogImg().subscribe(next => {
        this.listAlbum = next;
        console.log(next);
      }
      , error => console.log(error));
  }

  delete(i) {
    const r = confirm('Do you want delete this blog?');
    if (r) {
      const album = this.listAlbum[i];
      this.albumService.deleteBlogImg(album.id).subscribe(() => {
        this.albumService.getAllBlogImg().subscribe(next => {
          this.listAlbum = next;
        }, err => {
          if (err.status === 404) {
            this.listAlbum = null;
          }
        });
      }, error => console.log('aaa' + error));
    }
  }
}
