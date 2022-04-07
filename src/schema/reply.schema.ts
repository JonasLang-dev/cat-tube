import { object, string, TypeOf } from "zod"

export const createReplySchema = object({
    body: object({
        content: string({ required_error: "Content is required" }),
        comment: string({ required_error: "Comment id is required" })
    })
})

export const deleteReplySchema = object({
    params: object({
        id: string({ required_error: "Reply is required" }),
    })
})

export const updateReplySchema = object({
    params: object({
        id: string({ required_error: "Reply is required" }),
    }),
    body: object({
        content: string({ required_error: "Content is required" }),
    })
})


export type CreateReplyInput = TypeOf<typeof createReplySchema>["body"]
export type UpdateReplySchema = TypeOf<typeof updateReplySchema>
export type DeleteReplyInput = TypeOf<typeof deleteReplySchema>["params"]