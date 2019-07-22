import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Blog} from '../user/ipost';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private API_URL_BLOG = 'http://localhost:8080/api/blogs';
  constructor(
    private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.API_URL_BLOG}/getall`);
  }
  addBlog(blog: Partial<Blog>): Observable<Blog> {
    return this.http.post<Blog>(`${this.API_URL_BLOG}/create`, blog);
  }
  deleteBlog(id: number): Observable<Blog> {
    return this.http.delete<Blog>(`${this.API_URL_BLOG}/${id}`);
  }
  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.API_URL_BLOG}/${id}`);
  }
  update(blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.API_URL_BLOG}/${blog.id}`, blog);
  }
  seachByTitle(title: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.API_URL_BLOG}/user/searchall?title=${title}`);
  }
  getAllBlogByAllUser(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.API_URL_BLOG}-getall`);
  }
  getBlogByHashTag(hashTag: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.API_URL_BLOG}/hashtag/${hashTag}`);
  }
}
