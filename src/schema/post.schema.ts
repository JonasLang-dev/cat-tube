import { object, string, TypeOf } from "zod";

export const createPostSchema = object({
  body: object({
    email: string({ required_error: "Email is required." }).email(
      "No a valid email"
    ),
    postName: string({ required_error: "post name is required" }),
    postUrl: string({ required_error: "post url is required" }),
    posterUrl: string({ required_error: "poster url is required" }),
    description: string({ required_error: "description is required" }),
  }),
});

export type CreatePostInput = TypeOf<typeof createPostSchema>["body"];
