import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '../auth/message';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:8080/api/socket';

  constructor(private http: HttpClient) {
  }

  post(data: Message) {
    return this.http.post<Message>(this.url, data);
      // .subscribe((message: Message) => {
      //     return message;
      //   },
      //   error => {
      //     return  new Error(error);
      //   });
  }
}
