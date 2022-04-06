import { boolean, object, string, TypeOf } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "User name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be min 6 chars"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not match",
    path: ["passwordConfirmation"],
  }),
});

export const verifyUserSchema = object({
  params: object({
    id: string({ required_error: "Id is required." }),
    verificationCode: string({
      required_error: "verification code is required.",
    }),
  }),
});

export const forgetPasswordSchema = object({
  body: object({
    email: string({ required_error: "Email is required." }).email(
      "No a valid email"
    ),
  }),
});

export const resetPasswordSchema = object({
  params: object({
    id: string({
      required_error: "Id is required",
    }),
    passwordResetCode: string({
      required_error: "password reset code is required",
    }),
  }),
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(6, "Password is too short - should be min 6 chars"),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password do not match",
    path: ["passwordConfirmation"],
  }),
});

export const updateUserSchema = object({
  body: object({
    name: string().optional(),
    email: string().email("Not a valid email").optional(),
    avatar: string().optional(),
  }),
});

export const updatePasswordSchema = object({
  body: object({
    oldPassword: string({ required_error: "Old password is required" }),
    newPassword: string({ required_error: "New password is required" }),
    passwordConfirmation: string({
      required_error: "Password confirmation is required",
    }),
  })
    .refine((data) => data.newPassword === data.passwordConfirmation, {
      message: "Password do not match",
      path: ["passwordConfirmation"],
    })
    .refine((data) => data.oldPassword !== data.newPassword, {
      message: "Old password and new password should not be the same",
      path: ["newPassword"],
    }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];

export type ForgetPasswordInput = TypeOf<typeof forgetPasswordSchema>["body"];

export type ResetPasswordSchema = TypeOf<typeof resetPasswordSchema>;

export type UpdateUserInput = TypeOf<typeof updateUserSchema>["body"];

export type UpdatePasswordInput = TypeOf<typeof updatePasswordSchema>["body"];
