import { Request, Response } from "express";
import {
  AdminPostSchemaInput,
  PostSchemaInput,
  UpdatePostSchema,
} from "../schema/post.schema";
import fs from "fs";
import {
  createPost,
  findPostbyId,
  findPostMoreInfobyId,
  findPosts,
} from "../service/post.service";
import { findCategoryById } from "../service/category.service";

export const findAllPostsHandler = async (_req: Request, res: Response) => {
  try {
    const posts = await findPosts({});
    return res.status(200).send({ data: posts });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const activePostHandler = async (
  req: Request<AdminPostSchemaInput, {}, {}>,
  res: Response
) => {
  let post;

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
    post.save();
    return res.status(200).send({ data: post });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const inActivePostHandler = async (
  req: Request<AdminPostSchemaInput, {}, {}>,
  res: Response
) => {
  const { id } = req.params;
  let post;
  try {
    post = await findPostbyId(id);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  if (!post.isActive) {
    return res.status(400).send({ message: "Post is already inactive" });
  }

  post.isActive = false;

  post.save();
  return res.status(200).send({ data: post });
};

export const findPostsHandler = async (_req: Request, res: Response) => {
  try {
    const posts = await findPosts(
      { isActive: true },
      { sort: { createdAt: -1 } }
    );
    return res.status(200).send({ data: posts });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const findOwnPostsHandler = async (_req: Request, res: Response) => {
  try {
    const posts = await findPosts(
      { user: res.locals.user._id },
      { sort: { createdAt: -1 } }
    );
    return res.status(200).send({ data: posts });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const createPostHandler = async (req: Request, res: Response) => {
  try {
    const filename = `${Date.now()}${req.body.file.path}`;
    const path = `uploads/${filename}`;
    const data = req.body.data;

    // to convert base64 format into random filename

    const base64Data = data.replace("data:video/mp4;base64,", "");

    fs.writeFileSync(path, base64Data, { encoding: "base64" });

    const post = await createPost({
      user: res.locals.user._id,
      title: req.body.file.path,
      videoUrl: filename,
    });

    return res.send({
      data: post,
    });
  } catch (e: any) {
    return res.status(400).send({ message: e.message });
  }
};

export const updatePostHandler = async (
  req: Request<UpdatePostSchema["params"], {}, UpdatePostSchema["body"]>,
  res: Response
) => {
  const { title, description, isPublic, categoryId } = req.body;

  let post;

  try {
    post = await findPostbyId(req.params.id);
  } catch (error: any) {
    return res.status(400).send({ message: error });
  }

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  if (post.user != res.locals.user._id) {
    return res
      .status(401)
      .send({ message: "You are not authorized to update this post" });
  }

  if (title) {
    post["title"] = title;
  }

  if (description) {
    post["description"] = description;
  }

  if (isPublic !== null || isPublic !== undefined) {
    post["isPublic"] = Boolean(isPublic);
  }

  if (categoryId) {
    try {
      const category = await findCategoryById(categoryId);

      console.log(category);

      if (!category) {
        return res.status(404).send({ message: "Category not found" });
      }

      post["category"] = category._id;
    } catch (error: any) {
      return res.status(400).send({ message: error.message });
    }
  }

  post.save();

  return res.status(200).send({ data: post });
};

export const updatePostViewsHandler = async (
  req: Request<PostSchemaInput, {}, {}>,
  res: Response
) => {
  try {
    const post = await findPostbyId(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    post.views += 1;
    post.save();

    return res.status(200).send({ data: post });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const deletePostHandler = async (
  req: Request<PostSchemaInput, {}, {}>,
  res: Response
) => {
  try {
    const post = await findPostbyId(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    if (post.user != res.locals.user._id) {
      return res
        .status(401)
        .send({ message: "You are not authorized to delete this post" });
    }

    post.remove();

    return res.status(200).send({ meesage: "Post deleted successfully" });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const postMoreInfoHandler = async (
  req: Request<PostSchemaInput, {}, {}>,
  res: Response
) => {
  try {
    const post = await findPostMoreInfobyId(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    if (!post.isActive) {
      return res
        .status(401)
        .send({ message: "You are not authorized to view this post" });
    }

    return res.status(200).send({ data: post });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const updatePosterHandler = async (
  req: Request<PostSchemaInput, {}, {}>,
  res: Response
) => {
  const { id } = req.params;

  let post;
  try {
    post = await findPostbyId(id);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  if (post.user != res.locals.user._id) {
    return res
      .status(401)
      .send({ message: "You are not authorized to update this post" });
  }

  if (!req.file) {
    return res.status(400).send({ message: "No file provided" });
  }

  const { filename } = req.file;

  post["postUrl"] = filename;

  post.save();

  return res.status(200).send({ data: post });
};
