import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Category {
    @prop({ ref: () => User })
    user: Ref<User>;

    @prop({ required: true, unique: true, minlength: 3, maxlength: 50 })
    title: string;

    @prop({ required: true, minlength: 3 })
    description: string;
}

const CategoryModel = getModelForClass(Category, {
    schemaOptions: {
        timestamps: true,
    },
});

export default CategoryModel;
