import { Request, Response } from "express";
import { AdminPostSchemaInput } from "../schema/post.schema";
import fs from "fs";
import {
  createPost,
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
  
  let post

  try {
    post = await findPostbyId(req.params.id);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }

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

export const findPostsHandler = async (req: Request, res: Response) => {
  try {
    const posts = await findPosts({ isActive: true, isPublic: true }, { sort: { createdAt: -1 } });
    return res.status(200).send({ data: posts });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
}

export const findOwnPostsHandler = async (req: Request, res: Response) => {
  try {
    const posts = await findPosts({ user: res.locals.user._id }, { sort: { createdAt: -1 } });
    return res.status(200).send({ data: posts });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
}

export const createPostHandler = async (req: Request, res: Response) => {
  try {
    const fileName = `${Date.now()}${req.body.file.path}`;
    const path = `uploads/${fileName}`;
    const data = req.body.data;

    // to convert base64 format into random filename

    const base64Data = data.replace("data:video/mp4;base64,", "");

    fs.writeFileSync(path, base64Data, { encoding: "base64" });

    const post = await createPost({ user: res.locals.user._id, title: req.body.file.path, videoUrl: `/${fileName}` });

    return res.send({
      data: post
    });
  } catch (e: any) {
    return res.status(400).send({ message: e.message });
  }

}