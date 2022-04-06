import { getModelForClass } from "@typegoose/typegoose";
import { Category } from "./category.model";
import { Feeling } from "./feeling.model";
import { Post } from "./post.model";
import { Reply } from "./reply.model";
import { Session } from "./session.models";
import { User } from "./user.model";
import { Comment } from "./comment.model";
import { Subscription } from "./subscription.model";
import { History } from "./History.model";

export const UserModel = getModelForClass(User);
export const PostModel = getModelForClass(Post);
export const ReplyModel = getModelForClass(Reply);
export const SessionModel = getModelForClass(Session);
export const CategoryModel = getModelForClass(Category);
export const FeelingModel = getModelForClass(Feeling);
export const CommentModel = getModelForClass(Comment);
export const SubscriptionModel = getModelForClass(Subscription);
export const HistoryModel = getModelForClass(History);





