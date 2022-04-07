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

  const post = await findPostbyId(req.body.post);

  if (!post || !post.isPublic || !post.isActive) {
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

  const comment = await findCommentById(id);

  if (!comment) {
    return res.status(404).send({ message: "Comment do not exists" });
  }

  if (comment.user != res.locals.user._id) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  comment["content"] = content;

  try {
    const updateComment = await comment.save();
    res.send({ data: updateComment });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export const removeCommentHandler = async (req: Request, res: Response) => {
  const { id } = req.params;

  const comment = await findCommentById(id);

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
  const { id } = res.locals;

  const comments = await findUserComments({ user: id });

  return res.send({ data: comments });
};

export const findPostCommentsHandler = async (
  req: Request<GetPostCommentsInput, {}, {}>,
  res: Response
) => {
  const post = await findPostbyId(req.params.post);

  if (!post || !post.isPublic || !post.isActive) {
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
