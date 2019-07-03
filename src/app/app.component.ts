import {Component, OnInit} from '@angular/core';
import {TokenService} from './auth/token.service';
import {User} from './user/ipost';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roles: string[];
  private authority: string;
  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {
  }

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
  }

  logOut() {
    this.tokenService.signOut();
    window.location.reload();
  }
}
