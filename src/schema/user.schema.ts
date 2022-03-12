import { object, string, TypeOf } from "zod"

export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "User name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password is too short - should be min 6 chars"),
        passwordConfirmation: string({
            required_error: "Password confirmation is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email"),
    }).refine((data) => data.password === data.passwordConfirmation , {
        message: "Password do not match",
        path: ["passwordConfirmation"]
    })
})

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];