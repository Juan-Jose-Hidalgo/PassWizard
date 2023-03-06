import { ModelInterface } from "./model.interface";

export interface PasswordInterface extends ModelInterface {
    categoryId: number;
    name: string;
    password: string;
    userId: number;
}

export interface NewPassword {
    name: string;
    password: string;
    category?: number;
}

export interface PasswordList {
    actions?: string;
    category: string;
    created_at: string;
    name: string;
    password: string;
    passwordId: number;
}