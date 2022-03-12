import mongoose from "mongoose";
import config from "config"
import log from "./logger";

const connectToDb = async () => {
    const dbUri = config.get<string>("dbUri");
    try {
        await mongoose.connect(dbUri);
        log.info("Connected to db");
    } catch (error: any) {
        log.error(error.message);
        process.exit(1);
    }
}

export default connectToDb
