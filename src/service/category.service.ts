import { Category } from "../model/category.model";
import { FilterQuery, QueryOptions } from "mongoose";
import { CategoryModel } from "../model";

export const findCategories = async (
  query: FilterQuery<Category>,
  options: QueryOptions = { lean: true }
) => {
  return CategoryModel.find(query, {}, options);
};
