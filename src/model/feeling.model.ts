import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Post } from "./post.model";
import { User } from "./user.model";

export class Feeling {
    @prop({ ref: () => User })
    user: Ref<User>;

    @prop({ required: true })
    isLike: boolean;

    @prop({ ref: () => Post })
    post: string;
}

const FeelingModel = getModelForClass(Feeling, {
    schemaOptions: {
        timestamps: true,
    },
});

export default FeelingModel;
