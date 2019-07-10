import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AlbumImg, Img} from '../ipost';
import {UploadFileService} from '../../service/upload-file.service';
import {TokenService} from '../../auth/token.service';
import {HttpErrorResponse} from '@angular/common/http';
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

  constructor(
    private tokenService: TokenService,
    private fb: FormBuilder,
    private albumService: PostAlbumImgService
  ) {
  }

  ngOnInit() {
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

