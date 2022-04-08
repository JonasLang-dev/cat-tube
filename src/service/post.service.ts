import { Post } from "../model/post.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { _PrivateFields } from "../model/user.model";
import { PostModel } from "../model";

export const createPost = (input: Partial<Post>) => {
  return PostModel.create(input);
};

export const findPosts = (
  query: FilterQuery<Post>,
  options: QueryOptions = { lean: true }
) => {
  return PostModel.find(query, {}, options).populate("user", _PrivateFields).populate("category").populate("likes").populate("comments");
};

export const findPostbyId = async (id: string) => {
  return PostModel.findById(id).populate("user");
};