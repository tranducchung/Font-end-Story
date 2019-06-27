import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../user/ipost';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_LISTUSER = 'http://localhost:8080/api/listUser';
  private API_USER = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_LISTUSER);
  }
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.API_USER}/${id}`);
  }
}
