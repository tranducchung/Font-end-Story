
export interface Blog {
    id: number;
    title: string;
    content: string;
    urlVideo: string;
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

export interface Notification {
  id: number;
  content: string;
  userShare: string;
  idUserShare: number;
  idBlog: number;
  userReceive: User;

}
