import { object, string, TypeOf } from "zod";

export const createSessionSchema = object({
    body: object({
        email: string({ required_error: "Email is required." }).email("No a valid email"),
        password: string({ required_error: "Password is required" }).min(6, "Invalid email or password")
    })
})

export const removeSessionSchema = object({
    params: object({
        id: string({ required_error: "Id is required." })
    })
})

export type CreateSessionInput = TypeOf<typeof createSessionSchema>["body"]
export type RemoveSessionInput = TypeOf<typeof removeSessionSchema>["params"]
