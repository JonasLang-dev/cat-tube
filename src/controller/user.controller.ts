import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { CreateUserInput, ForgetPasswordInput, ResetPasswordSchema, VerifyUserInput } from "../schema/user.schema";
import { createUser, findUserById, fnidUserByEmail } from "../service/user.service";
import log from "../utils/logger";
import sendEmail from "../utils/mailer";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body;

    try {
        const user = await createUser(body);

        sendEmail({
            from: "1332969599@qq.com",
            to: user.email,
            subject: "Please verify your account",
            text: `http://localhost:5020/api/users/verify/${user._id}/${user.verificationCode}`
        })

        return res.send("user successfully created")
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(409).send("Account already exists")
        }

        return res.status(500).send(e)
    }
}

export async function resendEmail(req: Request, res: Response) {

}

export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;

    const user = await findUserById(id);

    if (!user) {
        return res.send('Could not verify user.')
    }

    if (user.verified) {
        return res.send("User is already verified.")
    }

    if (user.verificationCode == verificationCode) {
        user.verified = true;

        await user.save();

        return res.send("User successfully verified");
    }

    return res.send("Could not veriy user")
}

export async function forgetPasswordHandler(req: Request<{}, {}, ForgetPasswordInput>, res: Response) {

    const message = "If a user with that is registerd yout will receive a password reset email"

    const { email } = req.body;
    const user = await fnidUserByEmail(email)

    if (!user) {
        log.debug(`User with email ${email} does not exists`)
        return res.send(message)
    }

    if (!user.verified) {
        return res.send("User is not verified")
    }

    const passwordResetCode = nanoid()

    user.passwordResetCode = passwordResetCode

    await user.save()

    await sendEmail({
        from: "1332969599@qq.com",
        to: user.email,
        subject: "Please verify your account",
        text: `http://localhost:5020/api/users/verify/${user._id}/${user.passwordResetCode}`
    })

    log.debug(`Password is send to ${user.email}`)
    return res.send(message)
}

export async function resetPasswordHandler(req: Request<ResetPasswordSchema["params"], {}, ResetPasswordSchema["body"]>, res: Response) {

    const { id, passwordResetCode } = req.params

    const { password } = req.body

    const user = await findUserById(id)

    if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
        return res.status(400).send("Could not reset user password")
    }

    user.passwordResetCode = null

    user.password = password

    await user.save()

    return res.send("Successfully updated password")
}