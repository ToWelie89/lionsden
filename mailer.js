import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
dotenv.config();

const sendErrorLogMail = (pretext, errorLog) =>
    new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          secure: false,
          port: 587,
          auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
          }
        });
        const date = new Date().toLocaleDateString();
        const html = `
            <div>
                <div>
                    <p>
                      Detta är ett automatiserat error-mail för Lejonkulans automatiserade IG-feed script.
                    </p>
                </div>
                <div>
                    Timestamp: ${Date.now()} (${date})
                </div>
                <div>
                    ${pretext}
                </div>
                <div>
                    ${errorLog}
                </div>
            </div>
        `;
        
        const mailOptions = {
          from: process.env.MAIL_USERNAME,
          to: 'sonesson8909@hotmail.com',
          subject: `Lejonkulan ERROR-MAIL ${date}`,
          html
        };
        
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
            reject();
          } else {
            console.log('Email sent: ' + info.response);
            resolve();
          }
        });
    })

export default {
    sendErrorLogMail
};