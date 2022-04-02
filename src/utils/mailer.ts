import nodemailer, { SendMailOptions } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import log from "./logger";

function create_transport(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
  const smtpConfig: SMTPTransport.Options = {
    service: "QQ",
    port: 465,
    secure: true,
    auth: {
      user: "1332969599@qq.com",
      pass: "prpigwhelcpfgccf",
    },
  };
  const transporter = nodemailer.createTransport(smtpConfig);

  return transporter;
}

async function sendEmail(payload: SendMailOptions) {
  const transporter = create_transport();
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      log.error(err, "Error sending emailS");
    }
    log.info(info);
  });
}

export default sendEmail;
