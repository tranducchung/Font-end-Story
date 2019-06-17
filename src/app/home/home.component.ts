import {Component, OnInit} from '@angular/core';
import {TokenService} from '../auth/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  info: any;

  constructor(private tokenService: TokenService) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      author: this.tokenService.getAuthor()
    };
  }

  logOut() {
    this.tokenService.signOut();
    window.location.reload();
  }
}
