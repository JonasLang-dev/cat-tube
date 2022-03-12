import { DocumentType } from "@typegoose/typegoose";
import SessionModel from "../model/session.models";
import { User } from "../model/user.model";
import { signJwt } from "../utils/jwt";

export async function createSession({ userId }: { userId: string }) {
    return SessionModel.create({ user: userId })
}

export async function signRefreshToken({ userId }: { userId: string }) {
    const session = await createSession({
        userId
    });

    const refreshToken = signJwt(
        { session: session._id },
        "refreshTokenPrivateKey"
    );

    return refreshToken;
}

export function signAccessToken(user: DocumentType<User>) {
    const payload = user.toJSON();

    const accessToken = signJwt(payload, "accessTokenPrivateKey");

    return accessToken;
}