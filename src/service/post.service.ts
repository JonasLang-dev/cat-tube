import { Post } from "../model/post.model";
import { FilterQuery, QueryOptions } from "mongoose";
import { PostModel } from "../model";

export const createPost = (input: Partial<Post>) => {
  return PostModel.create(input);
};

export const findPosts = async (
  query: FilterQuery<Post>,
  options: QueryOptions = { lean: true }
) => {
  return PostModel.find(query, {}, options).populate("user", "name avatar").populate("category").populate("likes").populate("comments");
};

export const findPostbyId = async (id: string) => {
  return PostModel.findById(id)
};

export const findPostMoreInfobyId = async (id: string) => {
  return PostModel.findById(id).populate("user", "name avatar").populate({path: "category", select: "title"}).populate("likes").populate({ path: "commentsList", populate: { path: "replies user", select: "name avatar" } });
}