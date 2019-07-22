import {Component, OnInit} from '@angular/core';
import {TokenService} from './auth/token.service';
import {User} from './user/ipost';
import {UserService} from './service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  email: string;
  constructor(
    private tokenService: TokenService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.roles = this.tokenService.getAuthor();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    this.email = this.tokenService.getEmail();
  }

  logOut() {
    this.tokenService.signOut();
    window.location.href = 'http://localhost:4200/auth/login';
  }
}
