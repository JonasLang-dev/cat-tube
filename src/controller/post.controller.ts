import { Request, Response } from "express";
import { CreatePostInput } from "../schema/post.schema";
import { createPost, findPost, findPosts } from "../service/psot.service";
import { findUserByEmail } from "../service/user.service";

export const createPosttHanler = async (
  req: Request<{}, {}, CreatePostInput>,
  res: Response
) => {
  const { description, title, videoUrl, postUrl } = req.body;

  const user = res.locals.user;

  console.log(user);

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

export const removePostHandler = async (req: Request, res: Response) => {};

export const updatePostHandler = async (req: Request, res: Response) => {};

export const findUserPostsHandler = async (req: Request, res: Response) => {
  if (res.locals.user._id !== req.params.id) {
    return res.status(401).send([{ message: "Unauthorized" }]);
  }
  const posts = await findPosts({ user: res.locals.user._id });
  return res.send(posts);
};

export const findAllPostsHandler = async (req: Request, res: Response) => {
  if (res.locals.user.isAdmin) {
    const posts = await findPosts({});
    return res.send(posts);
  } else {
    return res.status(401).send([{ message: "Unauthorized" }]);
  }
};
