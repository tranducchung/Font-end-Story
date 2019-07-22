import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import {UserModule} from './user/user.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SocketComponent} from './socket/socket.component';
import {ToastrModule} from 'ngx-toastr';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SocketComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    UserModule,
    ToastrModule.forRoot(),
    NgxLinkifyjsModule.forRoot()
  ],
  providers: [httpInterceptorProviders],
  exports: [
    LoginComponent,
    HomeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
