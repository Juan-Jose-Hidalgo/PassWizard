import { ModelInterface } from "./model.interface";

export interface CategoryInterface extends ModelInterface {
    userId: number;
    name: string;
}