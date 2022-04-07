import { CommentModel } from "../model";
import { Comment } from "../model/comment.model";
import { FilterQuery, QueryOptions } from "mongoose";

export const createComment = async (input: Partial<Comment>) => {
  return CommentModel.create(input);
};

export const findCommentById = async (id: string) => {
  return CommentModel.findById(id);
};

export const findPostComments = async (
  query: FilterQuery<Comment>,
  options: QueryOptions = { lean: true }
) => {
  return CommentModel.find(query, {}, options).populate("replies");
};

export const findUserComments = async (
  query: FilterQuery<Comment>,
  options: QueryOptions = { lean: true }
) => {
  return CommentModel.find(query, {}, options).populate("replies");
};
