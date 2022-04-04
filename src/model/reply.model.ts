import { getModelForClass, modelOptions, pre, prop, Ref } from "@typegoose/typegoose";
import { Comment } from "./comment.model";
import { User } from "./user.model";

@pre<Reply>("find", async function () {
    this.populate({
        path: "user",
        select: "username avatar",
        options: {
            sort: "+createdAt",
        }
    })
})


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
    comment: Ref<Comment>;

    @prop({ required: true, minlength: 3 })
    content: string;
}
