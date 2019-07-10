import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AlbumImg, Blog, Img} from '../user/ipost';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostAlbumImgService {
  private ALBUM_API = 'http://localhost:8080/api/blogImgs/create';

  constructor(
    private http: HttpClient
  ) {}
  creatBlogImg(albumImg: Partial<AlbumImg>): Observable<number> {
    return this.http.post<number>(this.ALBUM_API, albumImg);
  }
}
