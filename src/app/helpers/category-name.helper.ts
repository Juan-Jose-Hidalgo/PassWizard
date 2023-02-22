import { CategoryInterface } from "../models/category.interface";

/**
 * Extracts the category name from a CategoryInterface object. The category name is assumed to have the format "number_name", and this method returns the "name" part of it.
 * 
 * - ^: Matches the start of the string.
 * - \d+: Matches one or more digits.
 * - : Matches the character "".
 * - /g: Matches all occurrences in the string.
 *
 * @param category - A CategoryInterface object with a "name" property in the format "number_name".
 * @returns The "name" part of the category name, without the leading number and underscore.
 */
export const categoryName = (category: CategoryInterface) => {
    return category.name.replace(/^\d+_/g, '');
}