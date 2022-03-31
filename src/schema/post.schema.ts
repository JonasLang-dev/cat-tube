import { object, string, TypeOf } from "zod";

export const createPostSchema = object({
  body: object({
    title: string({ required_error: "post title is required" }),
    videoUrl: string({ required_error: "post video url is required" }),
    postUrl: string().optional(),
    description: string({ required_error: "description is required" }),
  }),
});

export const updatePostSchema = object({
  body: object({
    title: string().optional(),
    videoUrl: string().optional(),
    postUrl: string().optional(),
    description: string().optional(),
  }),
  params: object({
    id: string({ required_error: "post id is required" }),
  }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>["body"];
export type UpdatePostSchema = TypeOf<typeof updatePostSchema>;
