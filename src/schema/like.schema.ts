import { object, string, TypeOf } from "zod";

export const createLikeSchema = object({
    body: object({
        post: string({ required_error: "post is required." }),
    })
})

export const removeLikeSchema = object({
    params: object({
        id: string({ required_error: "Id is required." }),
    })
})

export const postLikesSchema = object({
    params: object({
        post: string({ required_error: "post is required." }),
    })
})

export type CreateLikeInput = TypeOf<typeof createLikeSchema>["body"];
export type RemoveLikeInput = TypeOf<typeof removeLikeSchema>["params"];
export type PostLikesInput = TypeOf<typeof postLikesSchema>["params"];

