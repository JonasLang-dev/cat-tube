import UserModel, { User } from "../model/user.model";

export const createUser = (input: Partial<User>) => {
  return UserModel.create(input);
};

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export const findAllUser = () => {
  return UserModel.find(
    {},
    "email name avatar verified isAdmin isPremium isDelete"
  ).exec();
};

export const findWithUpdateUser = (id: any, user: Partial<User>) => {
  return UserModel.findOneAndUpdate(id, user);
};
