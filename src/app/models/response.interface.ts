import { User } from "./user.interface";

export interface ResponseInterface {
    status: string;
    data: {
        token?: string;
        user?: User;
    }
}
