import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AlbumImg, Img} from '../ipost';
import {UploadFileService} from '../../service/upload-file.service';
import {TokenService} from '../../auth/token.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostAlbumImgService} from '../../service/post-album-img.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-post-album-img',
  templateUrl: './post-album-img.component.html',
  styleUrls: ['./post-album-img.component.scss']
})
export class PostAlbumImgComponent implements OnInit {
  album: AlbumImg;
  albumForm: FormGroup;
  constructor(
    private tokenService: TokenService,
    private fb: FormBuilder,
    private albumService: PostAlbumImgService,
    private uploadService: UploadFileService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.albumForm = this.fb.group({
      title: ['', [Validators.required]],
    });
  }
  selectFile(event) {
    this.uploadService.selectFile(event);
  }

  onSubmit() {
    if (this.albumForm.valid) {
      const {value} = this.albumForm;
      const data = {
        ...this.album,
        ...value
      };
      this.albumService.creatBlogImg(data).subscribe(next => {
        console.log(next);
        this.uploadService.uploadFile(next).subscribe(() => {
            console.log('oke uploaded !!!');
            this.router.navigate(['/myAlbum']);
          },
          (err: HttpErrorResponse) => {
            console.log(err.message);
          });
      }, error => console.log(error));
    }
  }
}

