import {
  DocumentType,
  modelOptions,
  pre,
  index,
  prop,
  Severity,
  Ref,
} from "@typegoose/typegoose";
import { nanoid } from "nanoid";
import argon2 from "argon2";
import log from "../utils/logger";
import { Post } from "./post.model";
import { Subscription } from "./subscription.model";

export const privateFields = [
  "password",
  "__v",
  "verificationCode",
  "passwordResetCode",
  "verified",
];

export const _PrivateFields = [
  "-password",
  "-__v",
  "-verificationCode",
  "-passwordResetCode",
  "-verified",
];

@pre<User>("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await argon2.hash(this.password);

  this.password = hash;

  return;
})
@index({ email: 1 }, { unique: true })
@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop({ required: true })
  name: string;

  @prop({ default: "/avatar.png" })
  avatar: string;

  @prop({ required: true })
  password: string;

  @prop({ required: true, default: () => nanoid() })
  verificationCode: string;

  @prop()
  passwordResetCode: string | null;

  @prop({ default: false })
  verified: boolean;

  @prop({ default: false })
  isAdmin: boolean;

  @prop({ default: false })
  isPremium: boolean;

  @prop({ default: false })
  isDelete: boolean;

  @prop({
    ref: () => Post,
    localField: "_id",
    foreignField: "user",
    justOne: false,
    count: true,
  })
  public posts: Ref<Post>[];

  @prop({
    ref: () => Subscription,
    localField: "_id",
    foreignField: "subscriber",
    justOne: false,
  })
  public subscribers: Ref<Subscription>[];

  async validatePassword(this: DocumentType<User>, candidatePassword: string) {
    try {
      return await argon2.verify(this.password, candidatePassword);
    } catch (e) {
      log.error(e, "Could not validate password");
      return false;
    }
  }
}
