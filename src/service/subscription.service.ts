import { SubscriptionModel } from "../model";
import { Subscription } from "../model/subscription.model";
import { FilterQuery, QueryOptions } from "mongoose";
import { _PrivateFields } from "../model/user.model";

export const findSubById = async (id: string) => {
  return SubscriptionModel.findById(id);
};

export const createSubscription = async (input: Partial<Subscription>) => {
  return SubscriptionModel.create(input);
};

export const findSubs = async (
  query: FilterQuery<Subscription>,
  options: QueryOptions = { lean: true }
) => {
  return SubscriptionModel.find(query, {}, options);
};

export const findSubsMoreInfo = async (
  query: FilterQuery<Subscription>,
  options: QueryOptions = { lean: true }
) => {
  return SubscriptionModel.find(query, {}, options).populate(
    "publisher",
    _PrivateFields
  );
};

export const findSubscribers = async (
  query: FilterQuery<Subscription>,
  options: QueryOptions = { lean: true }
) => {
  return SubscriptionModel.find(query, {}, options).populate(
    "subscriber",
    _PrivateFields
  );
};

export const findSubscribed = async (
  currentUser: string,
  queryChannel: string
) => {
  return SubscriptionModel.find({
    publisher: queryChannel,
    subscriber: currentUser,
  });
};
