import { prop } from "@typegoose/typegoose";

export class Ads {
  @prop({ required: true, unique: true })
  public title: string;

  @prop({ required: true })
  public image: string;
}
