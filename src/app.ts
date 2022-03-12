require('dotenv').config()
import express from "express"
import config from "config"
import connectToDb from "./utils/connectToDb"
import log from "./utils/logger"
import router from "./routes"

const app = express()

app.use(express.json());

app.use(router)

const port = config.get<number>("port")

app.listen(port, async () => {
    log.info(`App started at http://localhost:${port}`);

    await connectToDb()
})