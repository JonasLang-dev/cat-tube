import UserModel, { User } from "../model/user.model";

export const createUser = (input: Partial<User>) => {
    return UserModel.create(input)
}