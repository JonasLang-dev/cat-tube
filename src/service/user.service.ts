import UserModel, { _PrivateFields, User } from "../model/user.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export const createUser = async (input: Partial<User>) => {
  return await UserModel.create(input);
};

export const findUserById = async (id: string) => {
  return await UserModel.findById(id);
}

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
}

export const findWithUpdateUser = async (id: any, user: Partial<User>) => {
  return UserModel.findOneAndUpdate(id, user);
};

export const findUsers = async (
  query: FilterQuery<User>,
  options: QueryOptions = { lean: true }
) => {
  return UserModel.find(query, {}, options).select(_PrivateFields);
};
