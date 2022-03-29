import { object, string, TypeOf } from "zod";

export const createPostSchema = object({
  body: object({
    title: string({ required_error: "post title is required" }),
    videoUrl: string({ required_error: "post video url is required" }),
    postUrl: string(),
    description: string({ required_error: "description is required" }),
  }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>["body"];
