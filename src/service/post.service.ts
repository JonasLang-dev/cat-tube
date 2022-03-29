import PostModel, { Post } from "../model/post.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { _PrivateFields } from "../model/user.model";

export const createPost = (input: Partial<Post>) => {
  return PostModel.create(input);
};

export const findAndUpdatePost = (
  query: FilterQuery<Post>,
  update: UpdateQuery<Post>,
  options: QueryOptions
) => {
  return PostModel.findOneAndUpdate(query, update, options);
};

export const findPosts = (
  query: FilterQuery<Post>,
  options: QueryOptions = { lean: true }
) => {
  return PostModel.find(query, {}, options).populate("user", _PrivateFields);
};

export const deletePost = (query: FilterQuery<Post>) => {
  return PostModel.deleteOne(query);
};
