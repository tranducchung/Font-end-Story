export interface Blog {
    id: number;
    title: string;
    content: string;
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
