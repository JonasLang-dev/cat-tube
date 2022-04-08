import {object, TypeOf, string} from "zod"

export const deleteAdsSchema = object({
    params: object({
        id: string({required_error: "Ads id is required"})
    })
})

export type DeleteAdsInput = TypeOf<typeof deleteAdsSchema>["params"]