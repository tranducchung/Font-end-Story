import {Component, OnInit} from '@angular/core';
import {UploadFileService} from '../../service/upload-file.service';
import {HttpClient, HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Img} from '../ipost';
import {TokenService} from '../../auth/token.service';
import {all} from 'codelyzer/util/function';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.scss']
})
export class FormUploadComponent implements OnInit {
  currentFileUpload: FileList;
  progress: { percentage: number } = {percentage: 0};
  showFile = false;
  fileUploads: Observable<Img[]>;
  constructor(private uploadService: UploadFileService,
              private tokenService: TokenService) {
  }

  ngOnInit() {
  }

  selectFile(event) {
    this.uploadService.selectFile(event);
  }

  upload() {
    // this.progress.percentage = 0;
    //
    // this.currentFileUpload = this.selectedFiles;
    // this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
    //   if (event.type === HttpEventType.UploadProgress) {
    //     this.progress.percentage = Math.round(100 * event.loaded / event.total);
    //   } else if (event instanceof HttpResponse) {
    //     console.log('File is completely uploaded!');
    //   }
    // });
    //
    // this.selectedFiles = undefined;
    this.uploadService.uploadFile()
      .subscribe(
        data => {
          console.log('oke uploaded !!!');
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
