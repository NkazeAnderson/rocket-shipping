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
    const requestBody = req.bodyJson;
    const {subject, html} = getHTML(requestBody.action)
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
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center">
    <tr>
      <td align="center" style="padding: 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 8px; padding: 20px;">
          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #ff7f00; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="color: #ffffff; margin: 0; font-family: Arial, sans-serif;">Shipping Confirmation</h2>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 20px; font-family: Arial, sans-serif; color: #888888;">
              <p style="font-size: 16px; margin: 0;">Hello <strong>${requiredInfo.userName}</strong>,</p>
              <p style="font-size: 16px;">Your package has been successfully registered for shipping.</p>
              <p style="font-size: 16px;">Details:</p>
              <ul style="padding-left: 20px; font-size: 16px;">
                <li style="margin-bottom: 4px;"><strong>Access Email:</strong> ${requiredInfo.userEmail}</li>
                <li style="margin-bottom: 4px;"><strong>Tracking Number:</strong> ${requiredInfo.accessKey}</li>
                <li style="margin-bottom: 4px;"><strong>Shipper:</strong> ${requiredInfo.shipperName}</li>
                <li style="margin-bottom: 4px;"><strong>Product:</strong> ${requiredInfo.product}</li>
                <li style="margin-bottom: 4px;"><strong>Destination:</strong> ${requiredInfo.destination}</li>
                <li style="margin-bottom: 4px;"><strong>Arrival Date:</strong> ${requiredInfo.arrivalDate}</li>
              </ul>
              <p style="font-size: 16px;">You can use your email and tracking number to track your package using the button below:</p>
              
              <p style="text-align: center;">
                <a href="${websiteUrl}/auth/login" style="background-color: #ff7f00; color: #ffffff; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block; font-size: 16px;">Track Your Package</a>
              </p>
              
              <p style="font-size: 16px;">Thank you for choosing our service!</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #eeeeee; padding: 10px; border-radius: 0 0 8px 8px; font-size: 14px; color: #666666;">
              <p style="margin: 0;">If you have any questions, contact us at <a href="mailto:${email}" style="color: #ff7f00; text-decoration: none;">${email}</a></p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>


`
      }

      break;

    default:
     return ""
  }
}