import { _PrivateFields, User } from "../model/user.model";
import { FilterQuery, QueryOptions } from "mongoose";
import { UserModel } from "../model";

export const createUser = async (input: Partial<User>) => {
  return UserModel.create(input);
};

export const findUserById = async (id: string, populate: string = "") => {
  return UserModel.findById(id).populate(populate);
};

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

export const findAllUsers = async () => {
  return UserModel.find({});
};

export const findUsers = (
  query: FilterQuery<User>,
  options: QueryOptions = { lean: true }
) => {
  return UserModel.find(query, {}, options)
    .select(_PrivateFields)
    .populate("posts")
    .populate("followers");
};
