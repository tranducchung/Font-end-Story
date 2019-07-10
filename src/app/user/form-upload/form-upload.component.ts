import {Component, OnInit} from '@angular/core';
import {UploadFileService} from '../../service/upload-file.service';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Img} from '../ipost';
import {TokenService} from '../../auth/token.service';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {
  showFile = false;
  fileUploads: Observable<Img[]>;

  constructor(private uploadService: UploadFileService,
              private tokenService: TokenService
  ) {
  }

  ngOnInit() {
  }

  selectFile(event) {
    this.uploadService.selectFile(event);
  }

  upload() {
    this.uploadService.uploadFile()
      .subscribe(
        data => {
          console.log('oke uploaded !!!');
          alert('Upload File Success');
        },
        (err: HttpErrorResponse) => {
          console.log(err.message);
        }
      );
  }

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getAllFile();
    }
  }
}
