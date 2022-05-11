import { Request, Response } from "express";
import {
  CreateCommentInput,
  GetPostCommentsInput,
  GetUserCommentsInput,
  UpdateCommentSchema,
} from "../schema/comment.schema";
import {
  createComment,
  findCommentById,
  findPostComments,
  findUserComments,
} from "../service/comment.service";
import { findPostbyId } from "../service/post.service";
import { findUserById } from "../service/user.service";

export const createCommentHandler = async (
  req: Request<{}, {}, CreateCommentInput>,
  res: Response
) => {
  const user = res.locals.user;

  const { content } = req.body;

  let post;
  try {
    post = await findPostbyId(req.body.post);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }

  try {
    const comment = await createComment({
      post: post._id,
      content,
      user: user._id,
    });

    return res.status(201).send({ message: comment });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const updateCommentHandler = async (
  req: Request<UpdateCommentSchema["params"], {}, UpdateCommentSchema["body"]>,
  res: Response
) => {
  const { id } = req.params;
  const { content } = req.body;

  let comment;
  try {
    comment = await findCommentById(id);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }

  if (!comment) {
    return res.status(404).send({ message: "Comment do not exists" });
  }

  if (comment.user != res.locals.user._id) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  comment["content"] = content;

  const updateComment = await comment.save();
  res.send({ data: updateComment });
};

export const removeCommentHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  let comment;
  try {
    comment = await findCommentById(id);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }

  if (!comment) {
    return res.status(404).send({ message: "Comment do not find" });
  }

  if (comment.user != res.locals.user._id) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    comment.remove();
    return res.send({ message: "Success remove comment" });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export const findOwnCommentHandler = async (req: Request, res: Response) => {
  const comments = await findUserComments({ user: res.locals.user._id });

  return res.send({ data: comments });
};

export const findPostCommentsHandler = async (
  req: Request<GetPostCommentsInput, {}, {}>,
  res: Response
) => {
  let post;

  try {
    post = await findPostbyId(req.params.post);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }

  if (!post) {
    return res.status(404).send({ message: "post dot not find" });
  }

  const comments = await findPostComments({ post: post._id });

  return res.send({ data: comments });
};

export const findUserCommentsHandler = async (
  req: Request<GetUserCommentsInput, {}, {}>,
  res: Response
) => {
  const user = await findUserById(req.params.user);

  if (!user || user.isDelete) {
    return res
      .status(400)
      .send({ message: "Can not find this user's commnets" });
  }

  const comments = await findUserComments({ user: user._id });

  return res.send({ data: comments });
};
