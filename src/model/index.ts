import { getModelForClass } from "@typegoose/typegoose";
import { Category } from "./category.model";
import { Feeling } from "./feeling.model";
import { Post } from "./post.model";
import { Reply } from "./reply.model";
import { Session } from "./session.models";
import { User } from "./user.model";
import { Comment } from "./comment.model";

export const UserModel = getModelForClass(User);
export const PostModel = getModelForClass(Post);
export const ReplyModel = getModelForClass(Reply, {
    schemaOptions: {
        timestamps: true,
    },
});

export const SessionModel = getModelForClass(Session, {
    schemaOptions: {
        timestamps: true,
    },
});

export const CategoryModel = getModelForClass(Category, {
    schemaOptions: {
        timestamps: true,
    },
});

export const FeelingModel = getModelForClass(Feeling, {
    schemaOptions: {
        timestamps: true,
    },
});

export const CommentModel = getModelForClass(Comment, {
    schemaOptions: {
        timestamps: true,
    },
});




