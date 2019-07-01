import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Img} from '../user/ipost';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private API_UPLOAD = 'http://localhost:8080//api/upload';
  constructor(private http: HttpClient) {}
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.API_UPLOAD, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }
  getAllFile(): Observable<Img[]> {
    return this.http.get<Img[]>(`${this.API_UPLOAD}/getall`);
  }
}
