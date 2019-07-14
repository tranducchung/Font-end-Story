import {Component, OnInit} from '@angular/core';
import {TokenService} from '../auth/token.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-oauth2',
  templateUrl: './oauth2.component.html',
  styleUrls: ['./oauth2.component.scss']
})
export class Oauth2Component implements OnInit {
  token: string;

  constructor(private tokenService: TokenService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.init();
  }


  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

    const results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  init() {
    this.token = this.getUrlParameter('token');
    if (this.token) {
      window.sessionStorage.setItem(this.tokenService.getToken(), this.token);
    }
  }
}
