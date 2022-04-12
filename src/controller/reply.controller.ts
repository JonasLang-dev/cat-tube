import { Request, Response } from "express"
import { CreateReplyInput, DeleteReplyInput, UpdateReplySchema } from "../schema/reply.schema";
import { findCommentById } from "../service/comment.service";
import { createReply, findReplies, findReplyById } from "../service/reply.service";

export const createReplyHandler = async (req: Request<{}, {}, CreateReplyInput>, res: Response) => {
    const { content } = req.body;

    const user = res.locals.user;

    const comment = await findCommentById(req.body.comment);

    if (!comment) {
        return res.status(404).send({ message: "Comment not found" });
    }

    try {
        const reply = await createReply({ user: user._id, comment: comment._id, content });
        return res.status(201).send({ data: reply });
    } catch (error: any) {
        return res.status(400).send({ message: error.message });
    }
}

export const getOwnRepliesHandler = async (_req: Request, res: Response) => {
    try {
        const replies = await findReplies({ user: res.locals.user._id });
        return res.status(200).send({ data: replies });
    } catch (error: any) {
        return res.status(400).send({ message: error.message });
    }
}

export const updateReplyHandler = async (req: Request<UpdateReplySchema["params"], {}, UpdateReplySchema["body"]>, res: Response) => {
    const { content } = req.body;

    let reply;
    try {
        reply = await findReplyById(req.params.id);
    } catch (error: any) {
        return res.status(400).send({ message: error.message });
    }

    if (!reply) {
        return res.status(404).send({ message: "Reply not found" });
    }

    if (reply.user != res.locals.user._id) {
        return res.status(403).send({ message: "You are not allowed to update this reply" });
    }

    reply.content = content;

    try {
        const updatedReply = await reply.save();
        return res.status(200).send({ data: updatedReply });
    } catch (error: any) {
        return res.status(400).send({ message: error.message });
    }
}

export const deleteReplyHandler = async (req: Request<DeleteReplyInput, {}, {}>, res: Response) => {
    let reply

    try {
        reply = await findReplyById(req.params.id);
    } catch (error: any) {
        return res.status(400).send({ message: error.message });
    }

    if (!reply) {
        return res.status(404).send({ message: "Reply not found" });
    }

    if (reply.user != res.locals.user._id) {
        return res.status(403).send({ message: "You are not allowed to delete this reply" });
    }

    await reply.remove();
    return res.send({ mssage: "Reply deleted" });
}