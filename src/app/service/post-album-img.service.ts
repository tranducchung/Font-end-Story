import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AlbumImg, Blog, Img} from '../user/ipost';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostAlbumImgService {
  private ALBUM_API = 'http://localhost:8080/api/blogImgs';

  constructor(
    private http: HttpClient
  ) {}
  creatBlogImg(albumImg: Partial<AlbumImg>): Observable<number> {
    return this.http.post<number>(`${this.ALBUM_API}/create`, albumImg);
  }
  getAllBlogImg(): Observable<AlbumImg[]> {
    return this.http.get<AlbumImg[]>(this.ALBUM_API);
  }
  getBlogImgById(id: number): Observable<AlbumImg> {
    return this.http.get<AlbumImg>(`${this.ALBUM_API}/${id}`);
  }
  getBlogImgShare(idUserShare: number, idBlogImgShare: number): Observable<AlbumImg> {
    return this.http.get<AlbumImg>(`${this.ALBUM_API}/${idBlogImgShare}/user/${idUserShare}`);
  }
  deleteBlogImg(id: number): Observable<any> {
    return this.http.delete<any>(`${this.ALBUM_API}/${id}`);
  }
}
