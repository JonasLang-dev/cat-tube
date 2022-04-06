import { Request, Response } from "express";
import { CreatePostInput, UpdatePostSchema } from "../schema/post.schema";
import {
  createPost,
  deletePost,
  findPostbyId,
  findPosts,
  updatePost,
} from "../service/post.service";

export const createPosttHanler = async (
  req: Request<{}, {}, CreatePostInput>,
  res: Response
) => {
  const { description, title, videoUrl, postUrl } = req.body;

  const user = res.locals.user;

  if (!user) {
    return res.status(401).send([{ message: "Unauthorized" }]);
  }

  if (user.isDelete) {
    return res.status(400).send([{ message: "Please verify your email" }]);
  }

  const post = await createPost({
    user: user._id,
    description,
    title,
    videoUrl,
    postUrl,
  });

  return res.send(post);
};

export const findUserPostsHandler = async (req: Request, res: Response) => {
  if (res.locals.user._id !== req.params.id) {
    return res.status(401).send([{ message: "Unauthorized" }]);
  }
  const posts = await findPosts({ user: res.locals.user._id });
  return res.send(posts);
};

export const findAllPostsHandler = async (__req: Request, res: Response) => {

  const posts = await findPosts({});
  return res.send({ data: posts });

};

export const deletePostHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = res.locals.user;

  const post = await findPostbyId(id);

  if (!post) {
    return res.status(404).send([{ message: "Post not found" }]);
  }

  if (user.isAdmin) {
    const deletedPost = await deletePost({ _id: id });
    return res.send(deletedPost);
  }

  // @ts-ignore
  if (post.user?._id != user._id) {
    return res.status(401).send([{ message: "Unauthorized" }]);
  }

  const deletedPost = await deletePost({ _id: id });

  res.send(deletedPost);
};

export const updatePostHandler = async (
  req: Request<UpdatePostSchema["params"], {}, UpdatePostSchema["body"]>,
  res: Response
) => {
  const { id } = req.params;
  const data = req.body;
  const user = res.locals.user;

  const post = await findPostbyId(id);

  if (!post) {
    return res.status(404).send([{ message: "Post not found" }]);
  }

  if (!user.isAdmin && data.hasOwnProperty("isActive")) {
    return res.status(401).send([{ message: "Unauthorized" }]);
  }

  if (user.isAdmin) {
    try {
      const updatedPost = await updatePost({ _id: id }, data, { new: true });
      res.send({ data: updatedPost });
    } catch (error: any) {
      res.status(400).send([{ message: error.message }]);
    }
  }

  // @ts-ignore
  if (post.user?._id != user._id) {
    return res.status(401).send([{ message: "Unauthorized" }]);
  }

  try {
    const updatedPost = await updatePost({ _id: id }, data, { new: true });
    res.send(updatedPost);
  } catch (error: any) {
    res.status(400).send([{ message: error.message }]);
  }
};
