import { ModelInterface } from "./model.interface";

export interface User extends ModelInterface {
    email: string;
    img: string;
    name: string;
    password: string;
    username: string;
}