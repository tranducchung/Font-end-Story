import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Img} from '../user/ipost';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private API_URL = 'http://localhost:8080/api/upload';
  private APT_LISTIMG = 'http://localhost:8080/api/user-getall';
  private APT_IMG = 'http://localhost:8080/api/files';
  constructor(private http: HttpClient) {
  }

  PostImg(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.API_URL, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  getFile(): Observable<Img[]> {
    return this.http.get<Img[]>(this.APT_LISTIMG);
  }
  getImg(nameFile: string): string {
    return 'http://localhost:8080/api/files' + nameFile;
  }
}
