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
import { findPostbyId } from "../service/post.service";

export const createHistoryController = async (
  req: Request<{}, {}, CreateHistoryInput>,
  res: Response
) => {
  const user = res.locals.user;
  const post = await findPostbyId(req.body.post);

  if (!post) {
    return res.status(404).send({ message: "Post not found" });
  }
  try {
    const history = createHistory({ post: post._id, user: user._id });
    return res.status(201).send(history);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const createSearchController = async (
  req: Request<{}, {}, CreateSearchInput>,
  res: Response
) => {
  const { search } = req.body;
  const user = res.locals;

  try {
    const history = createHistory({ search, type: "search", user: user._id });
    return res.status(201).send(history);
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
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

  const history = await findHistoryById(id);

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
