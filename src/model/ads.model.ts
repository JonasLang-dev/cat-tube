import { prop } from "@typegoose/typegoose";

export class Ads {
  @prop({ required: true })
  public content: string;

  @prop({ required: true })
  public adUrl: string;
}
