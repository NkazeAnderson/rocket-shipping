import { Client, Account, Databases, Storage, Query } from "appwrite";
import {
  bucket,
  database,
  shipmentCollection,
  shipmentHistoryCollection,
  userCollection,
} from "./contants";
import { shipmentHistoryT, shipmentT, userT, withId } from "@/types/types";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6674479b00230f8c4e57");

export const account = new Account(client);
export const storage = new Storage(client);
export const db = new Databases(client);

export async function getUsers() {
  const users = await db.listDocuments(database, userCollection);
  //@ts-ignore
  return users.documents as (userT & { $id: string })[];
}
export async function getUserById(id: string) {
  const user = await db.getDocument(database, userCollection, id);
  //@ts-ignore
  return user as withId<userT>;
}

export function getImageUrl(id: string) {
  return storage.getFilePreview(bucket, id).href;
}

export function subscribeToAdmin(
  callbackFunction: (action: string, payload: Record<string, string>) => void
) {
  console.log("subscribed");

  const unsubscribe = client.subscribe(
    [
      `databases.${database}.collections.${userCollection}.documents`,
      `databases.${database}.collections.${shipmentCollection}.documents`,
      `databases.${database}.collections.${shipmentHistoryCollection}.documents`,
    ],
    (res) => {
      console.log(res);

      const action =
        res.events[0].split(".")[res.events[0].split(".").length - 1];
      callbackFunction(action, res.payload as Record<string, string>);
    }
  );
  return unsubscribe;
}

export async function getShipments(): Promise<(shipmentT & { $id: string })[]> {
  const shipments = await db.listDocuments(database, shipmentCollection);
  //@ts-ignore
  return shipments.documents as (shipmentT & { $id: string })[];
}
export async function getHistory(shipmentId: string) {
  const historyRef = await db.listDocuments(
    database,
    shipmentHistoryCollection,
    [Query.equal("shipmentId", shipmentId)]
  );
  //@ts-ignore
  return historyRef.documents as (shipmentHistoryT & { $id: string })[];
}

export async function getMyInfo() {
  const data = await account.get();
  console.log("data", data);

  const users = await db.listDocuments(database, userCollection, [
    Query.equal("email", data.email),
  ]);
  //@ts-ignore
  return users.documents[0] as withId<userT>;
}
