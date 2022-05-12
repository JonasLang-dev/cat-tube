import { Request, Response } from "express";
import {
  CreateHistoryInput,
  CreateSearchInput,
  DeleteHistoryInput,
} from "../schema/history.schema";
import {
  createHistory,
  deleteMultipleHistory,
  findAllHistory,
  findHistoryById,
} from "../service/history.service";
import { findPostbyId, findPosts } from "../service/post.service";
import { findUsers } from "../service/user.service";

export const createHistoryController = async (
  req: Request<{}, {}, CreateHistoryInput>,
  res: Response
) => {
  const user = res.locals.user;

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
    const history = await createHistory({
      post: post._id,
      type: "watch",
      user: user._id,
    });
    return res.status(201).send(history);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const searchController = async (
  req: Request<CreateSearchInput, {}, {}>,
  res: Response
) => {
  const { search } = req.params;

  const reg = new RegExp(search, "i");
  const channels = await findUsers({ name: { $regex: reg } });

  const posts = await findPosts({
    $or: [{ title: { $regex: reg } }, { description: { $regex: reg } }],
  });

  return res.status(200).send({ data: { channels, posts } });
};

export const getAllHistoryController = async (_req: Request, res: Response) => {
  const user = res.locals.user;

  try {
    const history = await findAllHistory({ user: user._id });
    return res.status(200).send({ data: history });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const deleteHistoryController = async (
  req: Request<DeleteHistoryInput, {}, {}>,
  res: Response
) => {
  const { id } = req.params;

  let history;
  try {
    history = await findHistoryById(id);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }

  if (!history) {
    return res.status(404).send({ message: "History not found" });
  }

  if (history.user != res.locals.user._id) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    await history.remove();
    return res.status(200).send({ message: "History deleted" });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const getTypeHistoryController = async (req: Request, res: Response) => {
  const { type } = req.params;

  if (!["watch", "search"].includes(type)) {
    return res.status(400).send({ message: "Invalid type" });
  }

  const user = res.locals.user;

  try {
    const history = await findAllHistory({ type, user: user._id });
    return res.status(200).send({ data: history });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const deleteTypeHistoryController = async (
  req: Request,
  res: Response
) => {
  const { type } = req.params;

  if (!["watch", "search"].includes(type)) {
    return res.status(400).send({ message: "Invalid type" });
  }

  const user = res.locals.user;

  try {
    await deleteMultipleHistory({ type, user: user._id });
    return res.status(200).send({ message: "History deleted" });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};
