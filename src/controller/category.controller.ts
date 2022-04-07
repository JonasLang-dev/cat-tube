import { Request, Response } from "express";
import { findCategories } from "../service/category.service";

export const getCategoriesHandler = async (_req: Request, res: Response) => {
  try {
    const categories = await findCategories({});
    return res.status(200).send({ data: categories });
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
};
