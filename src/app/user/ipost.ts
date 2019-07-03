import DateTimeFormat = Intl.DateTimeFormat;
import {DatePipe} from '@angular/common';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export interface Blog {
    id: number;
    title: string;
    content: string;
    createDate: string;
    user: User;
}

export interface Roles {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    password: string;
    roles: Roles;
    active: number;
}

export interface Img {
  id: number;
  srcImg: string;
  user: User;
}
