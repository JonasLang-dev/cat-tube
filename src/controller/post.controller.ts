import { Request, Response } from "express";
import { CreatePostInput } from "../schema/post.schema";
import { createPost, findPost, findPosts } from "../service/psot.service";
import { findUserByEmail } from "../service/user.service";

export const createPosttHanler = async (
  req: Request<{}, {}, CreatePostInput>,
  res: Response
) => {
  const { email, description, postName, postUrl, posterUrl } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).send([{ message: "Unauthorized" }]);
  }

  if (!user.verified) {
    return res.status(400).send([{ message: "Please verify your email" }]);
  }

  if (user.isDelete) {
    return res.status(400).send([{ message: "Please verify your email" }]);
  }

  const post = await createPost({
    user: user._id,
    description,
    postName,
    postUrl,
    posterUrl,
  });

  return res.send(post);
};

export const removePostHandler = async (req: Request, res: Response) => {};

export const updatePostHandler = async (req: Request, res: Response) => {};

export const findAllPostsHandler = async (req: Request, res: Response) => {
  const posts = await findPosts({});
  return res.send(posts);
};
