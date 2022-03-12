import nodemailer, { SendMailOptions } from "nodemailer"
import log from "./logger";

const transporter = nodemailer.createTransport({
    // @ts-ignore
    service: "QQ",
    port: 465,
    secureConnection: true,
    auth: {
        user: "1332969599@qq.com",
        pass: "prpigwhelcpfgccf",
    },
});

async function sendEmail(payload: SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
        if (err) {
            log.error(err, "Error sending emailS")
        }
        log.info(info);  
    })
}

export default sendEmail;