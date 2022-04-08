import { AdsModel } from "../model";
import { Ads } from "../model/ads.model";

export const createAds = async (input: Partial<Ads>) => {
    return AdsModel.create(input)
}

export const findAds = async (query: any, options: any = { lean: true }) => {
    return AdsModel.find(query, {}, options);
}

export const findAdsById = async (id: string) => {
    return AdsModel.findById(id);
}