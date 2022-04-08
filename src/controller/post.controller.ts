import { Request, Response } from "express";
import { AdminPostSchemaInput } from "../schema/post.schema";
import {
  findPostbyId,
  findPosts,
} from "../service/post.service";

export const findAllPostsHandler = async (_req: Request, res: Response) => {
  try {
    const posts = await findPosts({});
    return res.status(200).send({ data: posts });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
}

export const activePostHandler = async (req: Request<AdminPostSchemaInput, {}, {}>, res: Response) => {
  const { id } = req.params;

  const post = await findPostbyId(id)

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  if (post.isActive) {
    return res.status(400).send({ message: "Post is already active" });
  }

  post.isActive = true;

  try {
    post.save()
    return res.status(200).send({ data: post });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
}

export const inActivePostHandler = async (req: Request<AdminPostSchemaInput, {}, {}>, res: Response) => {
  const { id } = req.params;

  const post = await findPostbyId(id)

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  if (!post.isActive) {
    return res.status(400).send({ message: "Post is already inactive" });
  }

  post.isActive = false;

  try {
    return res.status(200).send({ data: post });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
}