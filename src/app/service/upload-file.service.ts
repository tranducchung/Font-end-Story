import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Img} from '../user/ipost';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private API_UPLOAD = 'http://localhost:8080/api/upload/multi';
  constructor(private http: HttpClient) {}
  private myFiles: string[] = [];
  private mess: string;


  // pushFileToStorage(files: FileList): Observable<HttpEvent<{}>> {
  //   const formdata: FormData = new FormData();
  //
  //   for (let i = 0; i < files.length; i++) {
  //     formdata.append('files', files[i]);
  //   }
  //   const req = new HttpRequest('POST', `${this.API_UPLOAD}/multi`, formdata, {
  //     reportProgress: true,
  //     responseType: 'text'
  //   });
  //
  //   return this.http.request(req);
  // }
  selectFile(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  uploadFile(id: number): Observable<Img[]> {
    const formData = new FormData();
    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append('files', this.myFiles[i]);
    }
    this.myFiles = [];
    return this.http.post<Img[]>(`${this.API_UPLOAD}/${id}`, formData);
  }

  getAllFile(): Observable<Img[]> {
    return this.http.get<Img[]>(`${this.API_UPLOAD}/getall`);
  }
}
