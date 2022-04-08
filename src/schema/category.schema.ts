import { string, object, TypeOf } from "zod";

export const createCategorySchema = object({
  body: object({
    title: string({ required_error: "Title is required" }),
    description: string({ required_error: "Description is required" }),
  }),
});

export const updateCategorySchema = object({
  params: object({
    id: string({ required_error: "Category id is required" }),
  }),
  body: object({
    title: string().optional(),
    description: string().optional(),
  }),
});

export const deleteCategorySchema = object({
  params: object({
    id: string({ required_error: "Category id is required" }),
  }),
});

export type CreateCategoryInput = TypeOf<typeof createCategorySchema>["body"];
export type UpdateCategorySchema = TypeOf<typeof updateCategorySchema>;
export type DeleteCategoryInput = TypeOf<typeof deleteCategorySchema>["params"];
