import { ReplyModel } from "../model";
import { Reply } from "../model/reply.model";
import { FilterQuery, QueryOptions } from "mongoose";

export const createReply = async (input: Partial<Reply>) => {
    return ReplyModel.create(input);
}

export const findReplies = async (query: FilterQuery<Reply>, options: QueryOptions = { lean: true }) => {
    return ReplyModel.find(query, null, options);
}

export const findReplyById = async (id: string) => {
    return ReplyModel.findById(id);
}