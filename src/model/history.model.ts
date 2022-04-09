import { prop, Ref } from "@typegoose/typegoose";
import { Post } from "./post.model";
import { User } from "./user.model";


export class History {
    @prop()
    public search: string;

    @prop({ type: String, require: true, enum: ["watch", "search"] })
    public type: string;

    @prop({ required: true, ref: () => User })
    public user: Ref<User>;

    @prop({ ref: () => Post })
    public post: Ref<Post>;
}   