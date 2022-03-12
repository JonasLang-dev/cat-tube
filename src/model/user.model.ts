import { DocumentType, getModelForClass, modelOptions, pre, index, prop, Severity } from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import argon2 from "argon2"
import log from "../utils/logger";

@modelOptions({
    schemaOptions: {
        timestamps: true
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})

@pre<User>("save", async function () {
    if (!this.isModified('password')) {
        return;
    }

    const hash = await argon2.hash(this.password);

    this.password = hash;

    return;
})

export class User {
    @prop({ lowercase: true, required: true, unique: true })
    email: string

    @prop({ required: true })
    name: string

    @prop({ required: true })
    password: string

    @prop({ required: true, default: () => nanoid() })
    verificationCode: string

    @prop()
    passwordResetCode: string | null

    @prop({ default: false })
    verified: boolean

    @prop({ default: false })
    isAdmin: boolean

    @prop({ default: false })
    isPremium: boolean

    @prop({ default: false })
    isDelete: boolean

    async validatePassword(this: DocumentType<User>, candidatePassword: string) {
        try {
            return await argon2.verify(this.password, candidatePassword)
        } catch (e) {
            log.error(e, "Could not validate password")
            return false
        }
    }
}

const UserModel = getModelForClass(User);

export default UserModel;