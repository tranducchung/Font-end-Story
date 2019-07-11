import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AlbumImg, Blog, Notification, User} from '../user/ipost';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_USER = 'http://localhost:8080/api/users';
  private API_SHARE = 'http://localhost:8080/api/notifi/userReceive';
  private API_DELETEBLOGSHARE = 'http://localhost:8080/api/notifi/delete';
  constructor(private http: HttpClient) {
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_USER);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_USER}/${id}`);
  }
  shareBlog(idUser: number, idBlog: number): Observable<any> {
    return this.http.get<any>(`${this.API_USER}/shareToUser/${idUser}/blogs/${idBlog}`);
  }
  getListNotification(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.API_SHARE);
  }
  getBlogShare(idUserShare: number, idBlogShare: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.API_USER}/${idUserShare}/blogs/${idBlogShare}`);
  }
  deleteBlogShare(id: number): Observable<any> {
    return this.http.delete<any>(`${this.API_DELETEBLOGSHARE}/${id}`);
  }
  shareBlogByEmail(idUser: number, idBlog: number): Observable<any> {
    return this.http.get<any>(`${this.API_USER}/shareToUser/byEmail/${idUser}/blogs/${idBlog}`);
  }
  shareBlogImgSystem(idUser: number, idBlog: number): Observable<any> {
    return this.http.get<any>(`${this.API_USER}/shareToUser/${idUser}/blogImg/${idBlog}`);
  }
  shareBlogImgGmail(idUser: number, idBlog: number): Observable<any> {
    return this.http.get<any>(`${this.API_USER}/shareToUser/byEmail/${idUser}/blogImg/${idBlog}`);
  }
}

