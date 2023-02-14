import { CategoryInterface } from "./category.interface";
import { PasswordInterface } from "./password.interface";
import { User } from "./user.interface";

interface ResponseInterface {
    status: string;
}

export interface CategoryResponse extends ResponseInterface {
    categories: CategoryInterface[];
}

export interface UserResponse extends ResponseInterface {
    user: User;
    token?: string;
}

export interface PasswordResponse extends ResponseInterface {
    passwords: PasswordInterface[];
}

export interface TokenResponse extends ResponseInterface {
    token: string;
    userId: number;
    username: string;
}
