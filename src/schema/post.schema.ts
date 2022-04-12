import { object, string, TypeOf, boolean } from "zod";

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
    description: string({ required_error: "description is required" }),
    isPublic: boolean().optional(),
    categoryId: string().optional(),
  }),
  params: object({
    id: string({ required_error: "post id is required" }),
  }),
});

export const adminPostSchema = object({
  params: object({
    id: string({ required_error: "post id is required" }),
  })
})

export const postSchema = object({
  params: object({
    id: string({ required_error: "post id is required" }),
  })
})

export type CreatePostInput = TypeOf<typeof createPostSchema>["body"];
export type UpdatePostSchema = TypeOf<typeof updatePostSchema>;
export type AdminPostSchemaInput = TypeOf<typeof adminPostSchema>["params"];
export type PostSchemaInput = TypeOf<typeof postSchema>["params"];
