import { Request, Response } from "express";
import { stubTrue } from "lodash";
import {
  CreateSubInput,
  GetChannelInput,
  RemoveSubInput,
} from "../schema/subscription.schema";
import { findPosts } from "../service/post.service";
import {
  createSubscription,
  findSubById,
  findSubs,
  findSubscribers,
  findSubsMoreInfo,
} from "../service/subscription.service";
import { findUserById } from "../service/user.service";

export const createSubHnadler = async (
  req: Request<{}, {}, CreateSubInput>,
  res: Response
) => {
  const publisher = await findUserById(req.body.publisher);
  if (!publisher || publisher.isDelete) {
    return res.status(404).send({
      message: "Publisher not found",
    });
  }
  try {
    const subscription = await createSubscription({
      publisher: publisher._id,
      subscriber: res.locals.user._id,
    });

    return res.status(201).send({ data: subscription });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const removeSubHnadler = async (
  req: Request<RemoveSubInput, {}, {}>,
  res: Response
) => {
  const subscription = await findSubById(req.params.id);

  if (!subscription) {
    return res.status(404).send({
      message: "Subscription not found",
    });
  }

  if (subscription.subscriber != res.locals.user._id) {
    return res.status(403).send({
      message: "You are not authorized to remove this subscription",
    });
  }

  try {
    await subscription.remove();
    return res.status(200).send({ message: "Subscription removed" });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const getOwnSubsHandler = async (_req: Request, res: Response) => {
  try {
    const publishers = await findSubs({ subscriber: res.locals.user._id });
    return res.status(200).send({ data: publishers });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const getPostsFromChannelHandler = async (
  req: Request<GetChannelInput, {}, {}>,
  res: Response
) => {
  const publisher = await findUserById(req.params.id);
  if (!publisher || publisher.isDelete) {
    return res.status(404).send({
      message: "Publisher not found",
    });
  }

  try {
    const posts = await findPosts(
      { user: publisher._id, isActive: true, isPublic: true },
      {}
    );
    return res.status(200).send({ data: posts });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const getOwnChannelHandler = async (_req: Request, res: Response) => {
  try {
    const publishers = await findSubsMoreInfo({
      subscriber: res.locals.user._id,
    });
    return res.status(200).send({ data: publishers });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};

export const getOwnSubscribersHandler = async (
  _req: Request,
  res: Response
) => {
  try {
    const subscribers = await findSubscribers({
      publisher: res.locals.user._id,
    });

    return res.status(200).send({ data: subscribers });
  } catch (error: any) {
    return res.status(400).send({ message: error.message });
  }
};
