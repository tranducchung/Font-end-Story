
export interface Blog {
    id: number;
    title: string;
    content: string;
    urlVideo: string;
    createDate: string;
    hashTags: string;
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
  blogImg: AlbumImg;
}

export interface Notification {
  id: number;
  content: string;
  userShare: string;
  idUser: number;
  idBlog: number;
  userReceive: User;
}

export interface AlbumImg {
  id: number;
  title: string;
  user: User;
}
