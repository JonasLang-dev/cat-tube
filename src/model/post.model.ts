import { modelOptions, prop, Ref, index } from "@typegoose/typegoose";
import { Category } from "./category.model";
import { Like } from "./like.model";
import { Comment } from "./comment.model";
import { User } from "./user.model";

@modelOptions({
  schemaOptions: {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
})
@index({ title: "text" })
export class Post {
  @prop({ ref: () => User })
  public user: Ref<User>;

  @prop({ required: true })
  public title: string;

  @prop()
  public videoUrl: string;

  @prop()
  public postUrl: string;

  @prop()
  public description: string;

  @prop({ default: false })
  public isActive: boolean;

  @prop({ default: false })
  public isPublic: boolean;

  @prop({ type: Number, default: 0 })
  public views: number;

  @prop({ ref: () => Category })
  public category: Ref<Category>;

  @prop({
    ref: () => Like,
    localField: "_id",
    foreignField: "post",
    match: { isLike: true },
    justOne: false,
    count: true,
  })
  public likes: number;

  @prop({
    ref: () => Comment,
    localField: "_id",
    foreignField: "post",
    justOne: false,
    count: true,
  })
  public comments: number;

  @prop({
    ref: () => Comment,
    localField: "_id",
    foreignField: "post",
    justOne: false,
  })
  public commentsList: Ref<Comment>[];
}
