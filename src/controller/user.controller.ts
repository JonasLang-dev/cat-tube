import { Request, Response } from "express";
import { CreateUserInput, VerifyUserInput } from "../schema/user.schema";
import { createUser, findUserById } from "../service/user.service";
import sendEmail from "../utils/mailer";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body;

    try {
        const user = await createUser(body);

        sendEmail({
            from: "1332969599@qq.com",
            to: user.email,
            subject: "Please verify your account",
            text: `http://localhost:5020/api/user/verify/${user._id}/${user.verificationCode}`
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