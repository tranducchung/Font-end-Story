import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment} from '../user/ipost';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private API_COMMENT = 'http://localhost:8080/api/comments/blogs';
  constructor(
    private http: HttpClient
  ) {}
  createComment(idBlog: number, comment: Comment): Observable<any> {
    return this.http.post<any>(`${this.API_COMMENT}/${idBlog}`, comment);
  }
}
