import { Request, Response } from "express"
import { DeleteAdsInput } from "../schema/ads.schema";
import { createAds, findAds, findAdsById } from "../service/ads.service";

export const createAdsHandler = async (req: Request, res: Response) => {

    if (!req.file) {
        return res.status(400).send({ message: "Could not create ads" });
    }
    
    const { filename, originalname } = req.file;

    try {
        const ads = await createAds({ title: originalname, image: filename });

        return res.status(201).send({ data: ads });
    } catch (error: any) {
        return res.status(400).send({ message: error.message });
    }
}

export const getAdsHandler = async (req: Request, res: Response) => {
    try {
        const ads = await findAds({});

        return res.status(200).send({ data: ads });
    } catch (error: any) {
        return res.status(400).send({ message: error.message });
    }
}

export const deleteAdsHandler = async (req: Request<DeleteAdsInput, {}, {}>, res: Response) => {
    const { id } = req.params;

    const ads = await findAdsById(id);

    if (!ads) {
        return res.status(404).send({ message: "Ads not found" });
    }

    try {
        await ads.remove();
        return res.status(200).send({ message: "Ads deleted" });
    } catch (error: any) {
        return res.status(400).send({ message: error.message });
    }
}