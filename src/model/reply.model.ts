import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Comment } from "./comment.model";
import { Post } from "./post.model";
import { User } from "./user.model";

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
})

export class Reply {
    @prop({ ref: () => User })
    user: Ref<User>;

    @prop({ ref: () => Comment })

    @prop({ required: true, minlength: 3 })
    content: string;

}

const ReplyModel = getModelForClass(Reply, {
    schemaOptions: {
        timestamps: true,
    },
});

export default ReplyModel;
