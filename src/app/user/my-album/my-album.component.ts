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

}
