import UserModel, { User } from "../model/user.model";

export const createUser = (input: Partial<User>) => {
    return UserModel.create(input)
}

export function findUserById(id: string) {
    return UserModel.findById(id)
}

export function fnidByEmail(email: string) {
    return UserModel.findOne({ email })
}