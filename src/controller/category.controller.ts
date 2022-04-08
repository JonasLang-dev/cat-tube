import { Request, Response } from "express";
import {
  CreateCategoryInput,
  DeleteCategoryInput,
  UpdateCategorySchema,
} from "../schema/category.schema";
import {
  createCategory,
  findCategories,
  findCategoryById,
} from "../service/category.service";

export const getCategoriesHandler = async (_req: Request, res: Response) => {
  try {
    const categories = await findCategories({});
    return res.status(200).send({ data: categories });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

export const createCatoegoryHandler = async (
  req: Request<{}, {}, CreateCategoryInput>,
  res: Response
) => {
  const { title, description } = req.body;
  const user = res.locals.user;
  try {
    const category = await createCategory({
      title,
      description,
      user: user._id,
    });

    return res.status(201).send({ data: category });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

export const deleteCategoryHandler = async (
  req: Request<DeleteCategoryInput, {}, {}>,
  res: Response
) => {
  const { id } = req.params;

  const category = await findCategoryById(id);

  if (!category) {
    return res.status(404).send({ message: "Category not found" });
  }

  try {
    await category.remove();
    return res.status(200).send({ message: "Category deleted" });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};

export const updateCategoryHandler = async (
  req: Request<
    UpdateCategorySchema["params"],
    {},
    UpdateCategorySchema["body"]
  >,
  res: Response
) => {
  const { title, description } = req.body;

  const { id } = req.params;

  if (!title && !description) {
    return res.status(400).send({ message: "Nothing to update" });
  }

  const category = await findCategoryById(id);

  if (!category) {
    return res.status(404).send({ message: "Category not found" });
  }

  if (title) {
    category["title"] = title;
  }

  if (description) {
    category["description"] = description;
  }

  try {
    const updateCategory = await category.save();
    return res.status(200).send({ data: updateCategory });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};
