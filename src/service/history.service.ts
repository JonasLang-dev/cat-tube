import { FilterQuery, QueryOptions } from "mongoose";
import { HistoryModel } from "../model";
import { History } from "../model/history.model";
import { _PrivateFields } from "../model/user.model";

export const findAllHistory = (
  query: FilterQuery<History>,
  options: QueryOptions = { lean: true }
) => {
  return HistoryModel.find(query, {}, options).populate({
    path: "post",
    select: "title description postUrl videoUrl views user likes comments",
    populate: {
      path: "user",
      select: "name avatarUrl",
    },
  });
};

export const createHistory = (input: Partial<History>) => {
  return HistoryModel.create(input);
};

export const findHistoryById = (id: string) => {
  return HistoryModel.findById(id);
};

export const deleteMultipleHistory = async (
  query: FilterQuery<History>,
  options: QueryOptions = { lean: true }
) => {
  return HistoryModel.deleteMany(query, options);
};
