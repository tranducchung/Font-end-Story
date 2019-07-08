import { Component, OnInit } from '@angular/core';
import {UserService} from '../service/user.service';
import {TokenService} from '../auth/token.service';
import {NgxLinkifyOptions} from 'ngx-linkifyjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  board: string;
  errorMessage: string;
  info: any;

   options: NgxLinkifyOptions =
    {
      attributes: null,
      className: 'linkified',
      defaultProtocol: 'http',
      events: null,
      format:  (value, type) => {
        return value;
      },
      formatHref:  (href, type) => {
        return href;
      },
      ignoreTags: [],
      nl2br: false,
      tagName: 'a',
      target: {
        url: '_blank'
      },
      validate: true
    };

  constructor(
    private userService: UserService,
    private tokenService: TokenService
  ) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor()
    };
  }

}
