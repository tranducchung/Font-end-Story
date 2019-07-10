import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AlbumImg, Img} from '../ipost';
import {TokenService} from '../../auth/token.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostAlbumImgService} from '../../service/post-album-img.service';

@Component({
  selector: 'app-post-album-img',
  templateUrl: './post-album-img.component.html',
  styleUrls: ['./post-album-img.component.scss']
})
export class PostAlbumImgComponent implements OnInit {
  showFile = false;
  fileUploads: Observable<Img[]>;
  albumForm: FormGroup;
  album: AlbumImg;
  info: any;
  constructor(
    private tokenService: TokenService,
    private fb: FormBuilder,
    private albumService: PostAlbumImgService
  ) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor()
    };
    this.albumForm = this.fb.group({
      title: ['', [Validators.required]],
    });
  }

  selectFile(event) {
    this.albumService.selectFile(event);
  }
  onSubmit() {
    if (this.albumForm.valid) {
      const {value} = this.albumForm;
      const data = {
        ...this.album,
        ...value
      };
      console.log(data);
      this.albumService.createAlbum(data.toString()).subscribe(next => {
        console.log('Creat album success');
        console.log(next);
      }, error => console.log('AAAAAA' + error));
    }
  }
}

