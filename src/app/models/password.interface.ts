import { ModelInterface } from "./model.interface";

export interface PasswordInterface extends ModelInterface {
    categoryId: number;
    name: string;
    password: string;
    userId: number;
}