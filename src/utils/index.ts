import { userT } from "@/types/schemas";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { sendEmail } from "./appwrite";

export async function getLatLong(description: string) {
  const [result, ...res] = await getGeocode({ address: description });
  return getLatLng(result);
}

export function saveToLocalStore(key:string, value:Record<string, any>) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getFromLocalStore(key:string) {
  
  const res = localStorage.getItem(key)
  if (res) {
    console.log(`${key} from store`);
    return JSON.parse(res)
  }
  else{
    return res
  }
}

 export function stripOutAppwriteMetaData<T extends Record<string, any> >(data:T) {
  
    const keys = Object.keys(data)
    for(let key of keys) { 
      if (key.startsWith("$")) {
        delete data[key]
        console.log("deleted........");
        
      }
    }
    return data
}

export function sendNewShipmentEmail(receiver:userT) {
  sendEmail({
    text: `Hi ${receiver.name.toUpperCase()}, You have a New Shipment`,
    to: receiver.email,
    subject: "New Shipmnet Registered",
  });
}