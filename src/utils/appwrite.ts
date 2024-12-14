import { Client, Account, Databases, Storage, Query, ID, RealtimeResponseEvent, Functions } from "appwrite";
import {
  bucket,
  conversationCollection,
  database,
  emailFunctionId,
  messageCollection,
  shipmentCollection,
  shipmentHistoryCollection,
  userCollection,
} from "./contants";

import {conversationSchema, conversationT, shipmentHistorySchema, shipmentHistoryT, shipmentSchema, shipmentT, userSchema, userT} from "@/types/schemas"
import { RealTimeSubscriptionCallbackPayload, RealTimeSubscriptionPayload } from "@/types/types";
import { getShipmentExtras } from "./appwrite/shipments";
import { getMessage } from "./appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6674479b00230f8c4e57");

export const account = new Account(client);
export const storage = new Storage(client);
export const db = new Databases(client);

export const functions = new Functions(client);

export  async  function sendEmail(messageParams:{to:string, text:string, subject:string}){

    try {
      functions.createExecution(
        emailFunctionId,  // functionId
         JSON.stringify(messageParams) ,  // body (optional)
        false,  // async (optional)
       
    );
    } catch (error) {
      console.log(error);
      
    }

    }



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
      handleSubscription(res).then((callbackPayload)=>{
        callbackPayload &&  callbackFunction(callbackPayload);
      }).catch(e=>{
        console.log(e);
        
      })
        
     
    }
  );
  return unsubscribe;
}

const  handleSubscription = async (res:RealtimeResponseEvent<unknown>, ) => {
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
  if (payload.$collectionId === shipmentCollection) {
    const shipment:shipmentT = shipmentSchema.parse(payload)
    shipment.extras = await getShipmentExtras(shipment)
    switch (action) {
      case "create":
        callbackPayload = {
          action,
          target:"shipment",
          data:shipment
        }
        break;
      case "update":
        callbackPayload = {
          action,
          target:"shipment",
          data:shipment
        }
        break;
    
      default:
        break;
    }
   
  }
  if (payload.$collectionId === shipmentHistoryCollection) {
    const shipmentHistory:shipmentHistoryT = shipmentHistorySchema.parse(payload)
    switch (action) {
      case "create":
        callbackPayload = {
          action,
          target:"shipmentHistory",
          data:shipmentHistory
        }
        break;
      case "update":
        callbackPayload = {
          action,
          target:"shipmentHistory",
          data:shipmentHistory
        }
        break;
    
      default:
        break;
    }
   
  }
  if (payload.$collectionId === conversationCollection) {
    const conversation:conversationT = conversationSchema.parse(payload)
    switch (action) {
      case "create":
        callbackPayload = {
          action,
          target:"conversation",
          data:conversation
        }
        break;
      case "update":
        if (conversation.lastMessageId){
          callbackPayload = {
            action: "create",
            target:"message",
            data: await getMessage(conversation.lastMessageId)
          }
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
      handleSubscription(res).then((callbackPayload)=>{
        callbackPayload &&  callbackFunction(callbackPayload);
      }).catch(e=>{
        console.log(e);  
      })

    }
  );
  return unsubscribe;
}


export * from "./appwrite/user"
export * from "./appwrite/storage"
export * from "./appwrite/shipments"
export * from "./appwrite/conversations"
export * from "./appwrite/notifications"