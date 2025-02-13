import * as nodemailer from "nodemailer";

const email = process.env.Email
const mailPass = process.env.MailPass
const agencyName = process.env.AgencyName
const websiteUrl = process.env.WebsiteUrl
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: email || "",
    pass: mailPass || "",
  },
});


// async..await is not allowed in global scope, must use a wrapper
export default async ({ req, res, log, error }) => {
  // send mail with defined transport object
  try {
    if (req.method === 'OPTIONS') {
      return res.send('', 200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      })
    }
    
    const requestBody = req.bodyJson;
    log(requestBody)
    const {subject, html} = getHTML(requestBody)
     await transporter.sendMail({
      from: `"${agencyName}" <${email}>`, // sender address
      to: [email, requestBody.userEmail], // list of receivers
      subject,// Subject line
      // text, // plain text body
      html
    });
    return res.text("ok");
  } catch (e) {
    error(e);
    return res.text("bad");
  }

};

function getHTML( requiredInfo) {
  switch (requiredInfo.action) {
    case "shipment registered":
      return {
        subject: "Shipment Registration confirmation",
        html: `
              <html>
              <head>
                <title>Package Registration Confirmation</title>
                <meta name="viewport" content="width=device-width, initial-scale=1">
              </head>
              <body style="margin: 0; padding: 0; background-color: #2f2f2f; font-family: Arial, sans-serif;">

                <div style="max-width: 600px; width: 90%; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
                  
                  <!-- Header -->
                  <div style="background-color: #ff7f00; padding: 20px; text-align: center;">
                    <h2 style="color: #ffffff; margin: 0; font-size: 24px;">Shipping Confirmation</h2>
                  </div>

                  <!-- Body -->
                  <div style="padding: 20px; color: #888888;">
                    <p style="font-size: 16px; margin: 0;">Hello <strong>${requiredInfo.userName}</strong>,</p>
                    <p style="font-size: 16px;">Your package has been successfully registered for shipping.</p>

                    <p style="font-size: 16px;"><strong>Package Details:</strong></p>
                    <div style="padding-left: 20px; font-size: 16px;">
                      <ul>
                              <li style="margin-bottom: 4px;"><strong>Access Email:</strong> ${requiredInfo.userEmail}</li>
                              <li style="margin-bottom: 4px;"><strong>Tracking Number:</strong> ${requiredInfo.accessKey}</li>
                              <li style="margin-bottom: 4px;"><strong>Shipper:</strong> ${requiredInfo.shipperName}</li>
                              <li style="margin-bottom: 4px;"><strong>Product:</strong> ${requiredInfo.product}</li>
                              <li style="margin-bottom: 4px;"><strong>Destination:</strong> ${requiredInfo.destination}</li>
                              <li style="margin-bottom: 4px;"><strong>Arrival Date:</strong> ${requiredInfo.arrivalDate}</li>
                            </ul>
                    </div>

                    <p style="font-size: 16px;">You can track your package using the button below:</p>

                    <div style="text-align: center; margin: 20px 0;">
                      <a href="${websiteUrl}/auth/login" style="background-color: #ff7f00; color: #ffffff; text-decoration: none; padding: 14px 20px; border-radius: 5px; display: inline-block; font-size: 16px; width: 100%; max-width: 250px;">Track Package</a>
                    </div>

                    <p style="font-size: 16px;">Thank you for choosing our service!</p>
                  </div>

                  <!-- Footer -->
                  <div style="background-color: #eeeeee; padding: 10px; text-align: center; font-size: 14px; color: #666666;">
                  <p style="margin: 0;">If you have any questions, contact us at <a href="mailto:${email}" style="color: #ff7f00; text-decoration: none;">${email}</a></p>
                  </div>

                </div>

              </body>
              </html>

`
      }

      break;

    default:
     return ""
  }
}