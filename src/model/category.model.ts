import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";


@modelOptions({
  schemaOptions: {
    timestamps: true,
  }
})

export class Category {
  @prop({ ref: () => User })
  user: Ref<User>;

  @prop({ required: true, unique: true, minlength: 1, maxlength: 50 })
  title: string;

  @prop({ required: true, minlength: 3 })
  description: string;
}
