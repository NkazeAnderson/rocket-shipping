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
import {
  conversationWithMessageT,
  messageT,
  shipmentHistoryT,
  shipmentT,
  shipmentWithHistoryT,
  withId,
} from "@/types/types";

import {userSchema, userT} from "@/types/schemas"
import { getFromLocalStore, saveToLocalStore } from ".";

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
  //@ts-ignore
  const user = (await db.getDocument(
    database,
    userCollection,
    id
  )) as withId<userT>;
  if (user.image) {
    user.image = getImageUrl(user.image);
  }
  return user;
}

export function getImageUrl(id: string) {
  return storage.getFilePreview(bucket, id).href;
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

export async function getConversationId(member1: string, member2: string) {
  const conversationRef = await db.listDocuments(
    database,
    conversationCollection,
    [
      Query.or([
        Query.and([
          Query.equal("member1", member1),
          Query.equal("member2", member2),
        ]),
        Query.and([
          Query.equal("member1", member2),
          Query.equal("member2", member1),
        ]),
      ]),
    ]
  );
  if (conversationRef.documents.length) {
    return conversationRef.documents[0].$id;
  }
  return undefined;
}

export async function getConversations(user: withId<userT>) {
  console.log(user);

  const conversationRef = await db.listDocuments(
    database,
    conversationCollection,
    [
      Query.or([
        Query.equal("member1", user.$id),
        Query.equal("member2", user.$id),
      ]),
    ]
  );

  const conversations: conversationWithMessageT[] = [];
  for (const conversation of conversationRef.documents) {
    const messagesRef = await db.listDocuments(database, messageCollection, [
      Query.equal("conversationId", conversation.$id),
    ]);
    if ("member1" in conversation && "member2" in conversation) {
      if (conversation.member1 === user.$id) {
        conversation.member1 = user;
        conversation.member2 = await getUserById(conversation.member2);
      } else {
        conversation.member2 = user;
        conversation.member1 = await getUserById(conversation.member1);
      }
    }
    //@ts-ignore
    conversations.push({
      ...conversation,
      //@ts-ignore
      messages: messagesRef.documents.map((value) => {
        if (value.image) {
          value.image = getImageUrl(value.image);
          return value;
        }
        return value;
      }),
    });
  }
  return conversations;
}

export async function getLastMessage(conversationId: string) {
  const messageRef = await db.listDocuments(database, messageCollection, [
    Query.equal("conversationId", conversationId),
    Query.orderDesc("timeStamp"),
    Query.limit(1),
  ]);
  //@ts-ignore
  const lastMessage = messageRef.documents[0] as withId<messageT>;

  if (lastMessage.image) {
    lastMessage.image = getImageUrl(lastMessage.image);
  }
  console.log("Last message:", lastMessage);
  return lastMessage;
}

export async function sendMessage(message: messageT) {
  await db.createDocument(database, messageCollection, ID.unique(), message);
  await db.updateDocument(
    database,
    conversationCollection,
    message.conversationId,
    {
      lastMessage:
        message.text && message.text.length < 29
          ? message.text
          : message.text && message.text.length > 29
          ? message.text.slice(0, 28)
          : "shipping-img-new",
    }
  );
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

export async function getShipments(user: withId<userT>) {
  const shipmentsList: shipmentWithHistoryT[] = [];
  const shipments = user.isAdmin
    ? await db.listDocuments(database, shipmentCollection)
    : await db.listDocuments(database, shipmentCollection, [
        Query.equal("receiver", user.$id),
      ]);
  for (let shipment of shipments.documents) {
    const histories = await getHistory(shipment.$id);
    if (
      typeof shipment.courier === "string" &&
      typeof shipment.receiver === "string"
    ) {
      shipment.courier = await getUserById(shipment.courier);
      shipment.receiver = await getUserById(shipment.receiver);
    }

    if (shipment.image && typeof shipment.image === "string") {
      shipment.image = getImageUrl(shipment.image);
    }

    //@ts-ignore
    shipmentsList.push({ shipment, histories });
  }

  return shipmentsList;
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


export async function getMyInfo():Promise<userT> {
  const data = await account.get();
  const request =  db.listDocuments(database, userCollection, [
    Query.equal("email", data.email),
  ])
  const userInfo = getFromLocalStore("myInfo") || (await request).documents[0]
  request.then(user=>{
    saveToLocalStore("myInfo", user.documents[0])
  });
  const user = userSchema.parse(userInfo)
  if (user.image) {
    user.image = getImageUrl(user.image);
  }
  return user;
}

export async function getAuthStatus(): Promise<boolean> {
  try {
    await account.getSession("current")
    return true
  } catch (error) {
    return false
  }
}
export async function logIn(email:string, password:string) {
  await account.createEmailPasswordSession(email, password);
}
export async function logOut() {
  await account.deleteSession("current")
}