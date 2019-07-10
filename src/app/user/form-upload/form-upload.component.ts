import {Component, OnInit} from '@angular/core';
import {UploadFileService} from '../../service/upload-file.service';
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

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getAllFile();
    }
  }
}
