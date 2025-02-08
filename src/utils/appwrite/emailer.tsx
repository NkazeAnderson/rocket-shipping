import { emailFuncUrl } from "../contants";

type requiredInfoT = {
  action: "shipment registered";
  userName: string;
  userEmail: string;
  accessKey: string;
  shipperName: string;
  product: string;
  destination: string;
  arrivalDate: string;
};

export async function sendEmail(requiredInfo: requiredInfoT) {
  await fetch(emailFuncUrl, {
    method: "POST",
    body: JSON.stringify(requiredInfo),
  });
}
