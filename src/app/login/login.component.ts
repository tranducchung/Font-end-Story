import {Component, OnInit} from '@angular/core';
import {AuthLoginInfo} from '../auth/login-info';
import {AuthService} from '../auth/auth.service';
import {TokenService} from '../auth/token.service';
import {locateDirectiveOrProvider} from '@angular/core/src/render3/di';
import {SessionServiceService} from '../service/session-service.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService,
              private tokenService: TokenService,
              private sessionService: SessionServiceService,
              private router: Router,
              private route: ActivatedRoute,
  ) {
    // console.log(localStorage.getItem("AuthToken"));
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenService.getAuthor();
    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.email,
      this.form.password);

    this.authService.signIn(this.loginInfo).subscribe(
      data => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUsername(data.username);
        this.tokenService.saveEmail(data.email);
        this.tokenService.saveAuthor(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenService.getAuthor();
        if (this.sessionService.getLinkBlog() !== null) {
          window.location.href = this.sessionService.getLinkBlog();
          window.sessionStorage.removeItem(this.sessionService.getLinkBlog());
        } else {
          this.router.navigate(['/home']);
          setTimeout(this.reloadPage, 10);
          // this.reloadPage();
        }
      },
      error => {
        console.log(error);
        // alert('Invalid account or password! Please try again');
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
