import { _PrivateFields, User } from "../model/user.model";
import { UserModel } from "../model";

export const createUser = async (input: Partial<User>) => {
  return UserModel.create(input);
};

export const findUserById = async (id: string, populate: string = "") => {
  return UserModel.findById(id).select(_PrivateFields).populate(populate);
};

export const findUserByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

export const findAllUsers = async () => {
  return UserModel.find({});
}