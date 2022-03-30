import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Post {
  @prop({ ref: () => User, type: () => User })
  public user: Ref<User>;

  @prop({ required: true })
  public title: string;

  @prop({})
  public videoUrl: string;

  @prop()
  public postUrl: string;

  @prop({ required: true })
  public description: string;

  @prop({ default: false })
  public isActive: boolean;
}

const PostModel = getModelForClass(Post, {
  schemaOptions: {
    timestamps: true,
  },
});

export default PostModel;
