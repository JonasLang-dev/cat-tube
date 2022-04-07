import { object, string, TypeOf } from "zod";

export const createSubSchema = object({
  body: object({
    publisher: string({ required_error: "Publisher is required" }),
  }),
});

export const removeSubSchema = object({
  params: object({
    id: string({ required_error: "Subscription id is required" }),
  }),
});

export const getChannelSchema = object({
  params: object({
    id: string({ required_error: "Channel id is required" }),
  }),
});

export type CreateSubInput = TypeOf<typeof createSubSchema>["body"];
export type RemoveSubInput = TypeOf<typeof removeSubSchema>["params"];
export type GetChannelInput = TypeOf<typeof getChannelSchema>["params"];
