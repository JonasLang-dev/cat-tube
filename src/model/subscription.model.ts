import { modelOptions, pre, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

@modelOptions({
    schemaOptions: {
        timestamps: true,
    }
})

export class Subscription {
    @prop({ ref: () => User })
    publisher: Ref<User>;

    @prop({ ref: () => User })
    subscriber: Ref<User>;
}
