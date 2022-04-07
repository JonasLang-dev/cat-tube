import { object, string, TypeOf } from "zod";

export const createCommentSchema = object({
  body: object({
    post: string({ required_error: "Post id is required" }),
    content: string({ required_error: "Content is required" }).min(
      3,
      "Content at least 3 characters"
    ),
  }),
});

export const updateCommentSchema = object({
  params: object({
    id: string({ required_error: "Comment id is required" }),
  }),
  body: object({
    content: string({ required_error: "Content is required" }).min(
      3,
      "Content at least 3 characters"
    ),
  }),
});

export const removeCommentSchema = object({
  params: object({
    id: string({ required_error: "Comment id is required" }),
  }),
});

export const getPostCommentsSchema = object({
  params: object({
    post: string({ required_error: "Post id is required" }),
  }),
});

export const getUsreCommentsSchema = object({
  params: object({
    user: string({ required_error: "User id is required" }),
  }),
});

export type CreateCommentInput = TypeOf<typeof createCommentSchema>["body"];
export type UpdateCommentSchema = TypeOf<typeof updateCommentSchema>;
export type RemoveCommentInput = TypeOf<typeof removeCommentSchema>["params"];
export type GetPostCommentsInput = TypeOf<
  typeof getPostCommentsSchema
>["params"];
export type GetUserCommentsInput = TypeOf<
  typeof getUsreCommentsSchema
>["params"];
