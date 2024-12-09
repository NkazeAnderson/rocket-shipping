import { Client, Account, Databases, Storage, Query, ID, RealtimeResponseEvent } from "appwrite";
import {
  bucket,
  conversationCollection,
  database,
  messageCollection,
  shipmentCollection,
  shipmentHistoryCollection,
  userCollection,
} from "./contants";

import {shipmentT, userSchema, userT} from "@/types/schemas"
import { getUserById } from "./appwrite";
import {getImageUrl} from "./appwrite/storage"
import { RealTimeSubscriptionCallbackPayload, RealTimeSubscriptionPayload } from "@/types/types";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6674479b00230f8c4e57");

export const account = new Account(client);
export const storage = new Storage(client);
export const db = new Databases(client);

export async function getUsers() {
  const users = await db.listDocuments(database, userCollection);
  return userSchema.array().parse(users.documents) 
}



export function subscribeToAdmin(
  callbackFunction: (payload: RealTimeSubscriptionCallbackPayload) => void
) {
  const unsubscribe = client.subscribe(
    [
      `databases.${database}.collections.${userCollection}.documents`,
      `databases.${database}.collections.${shipmentCollection}.documents`,
      `databases.${database}.collections.${shipmentHistoryCollection}.documents`,
      `databases.${database}.collections.${conversationCollection}.documents`,
    ],
    (res) => {
      const callbackPayload = handleSubscription(res)
        
     callbackPayload &&  callbackFunction(callbackPayload);
    }
  );
  return unsubscribe;
}

const  handleSubscription = (res:RealtimeResponseEvent<unknown>, ) => {
  console.log("Real time data loading");
  
  const action =
    res.events[0].split(".")[res.events[0].split(".").length - 1];
  const payload = res.payload as RealTimeSubscriptionPayload
  let callbackPayload: RealTimeSubscriptionCallbackPayload|undefined = undefined
  if (payload.$collectionId === userCollection) {
    const user = userSchema.parse(payload)
    switch (action) {
      case "create":
        callbackPayload = {
          action,
          target:"user",
          data:user
        }
        break;
      case "update":
        callbackPayload = {
          action,
          target:"user",
          data:user
        }
        break;
    
      default:
        break;
    }
   
  }
    
 return callbackPayload

}



export function subscribeToUser(
  userId: string,
  shipments: shipmentT[],
  callbackFunction: (payload:RealTimeSubscriptionCallbackPayload) => void
) {
  const shipmentsIds:string[] = []
  const shipmertHististoriesIds:string[] = []
  shipments.forEach(shipment=>{
    shipmentsIds.push(shipment.$id),
    shipment.extras?.histories?.forEach(history=>{
      shipmertHististoriesIds.push(history.$id)
    })
  })
  const unsubscribe = client.subscribe(
    [
      ...shipmentsIds.map(
        (value) =>
          `databases.${database}.collections.${shipmentCollection}.documents.${value}`
      ),
      ...shipmertHististoriesIds.map(
        (value) =>
          `databases.${database}.collections.${shipmentHistoryCollection}.documents.${value}`
      ),
      `databases.${database}.collections.${userCollection}.documents.${userId}`,
    ],
    (res) => {
      const callbackPayload = handleSubscription(res)
        
     callbackPayload &&  callbackFunction(callbackPayload);

    }
  );
  return unsubscribe;
}


export * from "./appwrite/user"
export * from "./appwrite/storage"
export * from "./appwrite/shipments"
export * from "./appwrite/conversations"