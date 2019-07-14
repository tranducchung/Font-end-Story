import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Comment, ReplyCommnent} from '../user/ipost';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private API_COMMENT = 'http://localhost:8080/api/comments/blogs';
  private API_REPCOMMENT = 'http://localhost:8080/api/reps/comment';
  constructor(
    private http: HttpClient
  ) {}
  createComment(idBlog: number, comment: Comment): Observable<any> {
    return this.http.post<any>(`${this.API_COMMENT}/${idBlog}`, comment);
  }
  createRepComment(idComment: number, repComment: ReplyCommnent): Observable<any> {
    return this.http.post<any>( `${this.API_REPCOMMENT}/${idComment}`, repComment);
  }
}
