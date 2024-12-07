import { Client, Account, Databases, Storage, Query, ID } from "appwrite";
import {
  bucket,
  conversationCollection,
  database,
  messageCollection,
  shipmentCollection,
  shipmentHistoryCollection,
  userCollection,
} from "./contants";

import {userSchema, userT} from "@/types/schemas"
import { getUserById } from "./appwrite";
import {getImageUrl} from "./appwrite/storage"

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
  callbackFunction: (action: string, payload: Record<string, string>) => void
) {
  const unsubscribe = client.subscribe(
    [
      `databases.${database}.collections.${userCollection}.documents`,
      `databases.${database}.collections.${shipmentCollection}.documents`,
      `databases.${database}.collections.${shipmentHistoryCollection}.documents`,
      `databases.${database}.collections.${conversationCollection}.documents`,
    ],
    (res) => {
      const action =
        res.events[0].split(".")[res.events[0].split(".").length - 1];
      callbackFunction(action, res.payload as Record<string, string>);
    }
  );
  return unsubscribe;
}



export function subscribeToUser(
  userId: string,
  shipmentIds: string[],
  historyIds: string[],
  callbackFunction: (action: string, payload: Record<string, string>) => void
) {
  const unsubscribe = client.subscribe(
    [
      ...shipmentIds.map(
        (value) =>
          `databases.${database}.collections.${shipmentCollection}.documents.${value}`
      ),
      ...historyIds.map(
        (value) =>
          `databases.${database}.collections.${shipmentHistoryCollection}.documents.${value}`
      ),
      `databases.${database}.collections.${userCollection}.documents.${userId}`,
    ],
    (res) => {
      const action =
        res.events[0].split(".")[res.events[0].split(".").length - 1];
      callbackFunction(action, res.payload as Record<string, string>);
    }
  );
  return unsubscribe;
}


export * from "./appwrite/user"
export * from "./appwrite/storage"
export * from "./appwrite/shipments"
export * from "./appwrite/conversations"