import { Component, OnInit } from '@angular/core';
import {UploadFileService} from '../../service/upload-file.service';
import {Observable} from 'rxjs';
import {Img} from '../ipost';

@Component({
  selector: 'app-list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.scss']
})
export class ListUploadComponent implements OnInit {
  showFile = false;
  fileUploads: Observable<Img[]>;

  constructor(private uploadService: UploadFileService) {}

  ngOnInit() {
  }

  showFiles(enable: boolean) {
    this.showFile = enable;

    if (enable) {
      this.fileUploads = this.uploadService.getAllFile();
    }
  }

}
