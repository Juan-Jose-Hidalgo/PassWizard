import { CategoryInterface } from "../models/category.interface";

export const categoryName = (category: CategoryInterface) => {
    return category.name.split('_').pop()!;
}