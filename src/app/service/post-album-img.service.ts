import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AlbumImg, Blog, Img} from '../user/ipost';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostAlbumImgService {
  private API_ALBUM = 'http://localhost:8080/api/blogimgs/create';
  private myFiles: string[] = [];
  private mess: string;

  constructor(
    private http: HttpClient
  ) {
  }

  selectFile(event) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  createAlbum(title: string): Observable<AlbumImg> {
    const formData = new FormData();
    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append('files', this.myFiles[i]);
    }
    this.myFiles = [];
    formData.append('data', title);
    return this.http.post<AlbumImg>(this.API_ALBUM, formData);
  }

}
