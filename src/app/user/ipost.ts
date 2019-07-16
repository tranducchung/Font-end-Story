
export interface Blog {
    id: number;
    title: string;
    content: string;
    urlVideo: string;
    createDate: string;
    hashTags: string;
    user: User;
    commentList: Comment[];
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
  listImg: Img[];
  user: User;
}

export interface Comment {
  id: number;
  content: string;
  replyList: ReplyCommnent[];
  blog: Blog;
  user: User;
}

export interface ReplyCommnent {
  id: number;
  content: string;
  userReply: User;
}
