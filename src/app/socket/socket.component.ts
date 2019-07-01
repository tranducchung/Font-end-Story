import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../auth/message';
import {SocketService} from '../service/socket.service';
import {ToastrService} from 'ngx-toastr';
import {TokenService} from '../auth/token.service';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss']
})
export class SocketComponent implements OnInit {

  private serverUrl = 'http://localhost:8080/socket';
  isLoaded = false;
  isCustomSocketOpened = false;
  private stompClient;
  private form: FormGroup;
  private userForm: FormGroup;
  messages: Message[] = [];
  info: any;
  constructor(private socketService: SocketService,
              private tokenService: TokenService,
              private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      username: this.tokenService.getUsername(),
      email: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthor()
    };
    this.form = new FormGroup({
      message: new FormControl(null, [Validators.required])
    });
    this.userForm = new FormGroup({
      fromId: new FormControl(null, [Validators.required]),
      toId: new FormControl(null)
    });
    this.initializeWebSocketConnection();
  }

  sendMessageUsingSocket() {
    if (this.form.valid) {
      const message: Message = {message: this.form.value.message, fromId : this.userForm.value.fromId, toId: this.userForm.value.toId};
      this.stompClient.send('/socket-subscriber/send/message', {}, JSON.stringify(message));
    }
  }

  sendMessageUsingRest() {
    if (this.form.valid) {
      const message: Message = {message: this.form.value.message, fromId: this.userForm.value.fromId, toId: this.userForm.value.toId};
      this.socketService.post(message).subscribe(res => {
        console.log(res);
      });
    }
  }

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, connect => {
      that.isLoaded = true;
      that.openGlobalSocket();
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe('/socket-publisher', (message) => {
      this.handleResult(message);
    });
  }

  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe('/socket-publisher/' + this.userForm.value.fromId, (message) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message) {
    if (message.body) {
      const messageResult: Message = JSON.parse(message.body);
      console.log(messageResult);
      this.messages.push(messageResult);
      this.toastr.success('new message recieved', null, {easeTime: 3000});
    }
  }


}
