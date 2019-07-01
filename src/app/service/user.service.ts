import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user/ipost';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_USER = 'http://localhost:8080//api/users';

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
}

