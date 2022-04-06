import { LikeModel } from "../model";
import { Like } from "../model/like.model";
import { FilterQuery, QueryOptions } from "mongoose";


export const createLike = async (input: Partial<Like>) => {
    return LikeModel.create(input);
}

export const findLikebyId = async (id: string) => {
    return LikeModel.findById(id);
}

export const findLikes = async (
    query: FilterQuery<Like>,
    options: QueryOptions = { lean: true }
) => {
    return LikeModel.find(query, {}, options).populate('user', "email username avatar").populate("post", "title postUrl videoUrl");
};