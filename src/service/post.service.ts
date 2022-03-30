import PostModel, { Post } from "../model/post.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import { _PrivateFields } from "../model/user.model";

export const createPost = (input: Partial<Post>) => {
  return PostModel.create(input);
};

export const findPosts = (
  query: FilterQuery<Post>,
  options: QueryOptions = { lean: true }
) => {
  return PostModel.find(query, {}, options).populate("user", _PrivateFields);
};

export const findbyId = (id: string) => {
  return PostModel.findById(id).populate("user");
};

export const deletePost = (query: FilterQuery<Post>) => {
  return PostModel.deleteOne(query);
};

export const updatePost = (
  query: FilterQuery<Post>,
  update: UpdateQuery<Post>,
  options: QueryOptions
) => {
  return PostModel.findOneAndUpdate(query, update, options);
};
