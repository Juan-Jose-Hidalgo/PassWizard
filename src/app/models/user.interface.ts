import { ModelInterface } from "./model.interface";

export interface User extends ModelInterface {
    email: string;
    name: string;
    password: string;
    username: string;
}