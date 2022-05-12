import { object, string, TypeOf } from "zod";

export const createSearchSchema = object({
  params: object({
    search: string({ required_error: "search is required." }),
  }),
});

export const createHistorySchema = object({
  body: object({
    post: string({ required_error: "Post id is required." }),
  }),
});

export const historyTypeSchema = object({
  params: object({
    type: string({ required_error: "Post id is required." }),
  }),
});

export const deleteHistorySchema = object({
  params: object({
    id: string({ required_error: "History id is required." }),
  }),
});

export type CreateSearchInput = TypeOf<typeof createSearchSchema>["params"];
export type CreateHistoryInput = TypeOf<typeof createHistorySchema>["body"];
export type HistoryTypeInput = TypeOf<typeof historyTypeSchema>["params"];
export type DeleteHistoryInput = TypeOf<typeof deleteHistorySchema>["params"];
