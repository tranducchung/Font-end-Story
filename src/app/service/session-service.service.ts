import { Injectable } from '@angular/core';

const LINK_BLOG = 'LinkBlog';
@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {
  private roles: Array<string> = [];

  constructor() {
  }
  public saveLink(linkBlog: string) {
    window.sessionStorage.removeItem(LINK_BLOG);
    window.sessionStorage.setItem(LINK_BLOG, linkBlog);
  }
  public getLinkBlog(): string {
    return sessionStorage.getItem(LINK_BLOG);
  }

}
