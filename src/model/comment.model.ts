import { getModelForClass, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { Post } from "./post.model";
import { Reply } from "./reply.model";
import { User } from "./user.model";

@modelOptions({
    schemaOptions: {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true,
    }
})

export class Comment {
    @prop({ ref: () => User })
    user: Ref<User>;

    @prop({ ref: () => Post })
    post: Ref<Post>;

    @prop({ required: true, minlength: 3 })
    content: string;

    @prop({ 
        ref: () => Reply, 
        localField: "_id", 
        foreignField: "comment", 
        justOne: false, 
        options: { sort: { createdAt: -1 } } 
    })
    replies: Ref<Reply>[];
}
