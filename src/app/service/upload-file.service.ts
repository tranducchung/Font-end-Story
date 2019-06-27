import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private API_UPLOAD = 'http://localhost:8080/api/user';
  constructor(private http: HttpClient) { }
}
