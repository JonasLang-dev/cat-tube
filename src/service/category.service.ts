import { Category } from "../model/category.model";
import { FilterQuery, QueryOptions } from "mongoose";
import { CategoryModel } from "../model";

export const findCategories = async (
  query: FilterQuery<Category>,
  options: QueryOptions = { lean: true }
) => {
  return CategoryModel.find(query, {}, options);
};

export const findCategoryById = async (id: string) => {
  return CategoryModel.findById(id);
};

export const createCategory = async (input: Partial<Category>) => {
  return CategoryModel.create(input);
};
