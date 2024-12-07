import { ID, Query } from "appwrite";
import { conversationCollection, database, messageCollection } from "../contants";
import { db, getImageUrl } from "../appwrite";
import { conversationSchema, conversationT } from "@/types/schemas";

export async function addConversation(conversation: conversationT) {
    const id = ID.unique()
    await db.createDocument(
        database,
        conversationCollection,
        id,
        conversation
      )
    return id
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
    if (conversationRef.total) {
        return conversationRef.documents[0].$id;
    }else {
        return undefined;
    }
  }
  
  export async function getConversations(userId: string) {

    const conversationRef = await db.listDocuments(
      database,
      conversationCollection,
      [
        Query.or([
          Query.equal("member1", userId),
          Query.equal("member2", userId),
        ]),
      ]
    );
  
    // const conversations: conversationWithMessageT[] = [];
    // for (const conversation of conversationRef.documents) {
    //   const messagesRef = await db.listDocuments(database, messageCollection, [
    //     Query.equal("conversationId", conversation.$id),
    //   ]);
    //   if ("member1" in conversation && "member2" in conversation) {
    //     if (conversation.member1 === user.$id) {
    //       conversation.member1 = user;
    //       conversation.member2 = await getUserById(conversation.member2);
    //     } else {
    //       conversation.member2 = user;
    //       conversation.member1 = await getUserById(conversation.member1);
    //     }
    //   }
    //   //@ts-ignore
    //   conversations.push({
    //     ...conversation,
    //     //@ts-ignore
    //     messages: messagesRef.documents.map((value) => {
    //       if (value.image) {
    //         value.image = getImageUrl(value.image);
    //         return value;
    //       }
    //       return value;
    //     }),
    //   });
    // }

    const conversations = conversationSchema.array().parse(conversationRef.documents)
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
  
//   export async function sendMessage(message: messageT) {
//     await db.createDocument(database, messageCollection, ID.unique(), message);
//     await db.updateDocument(
//       database,
//       conversationCollection,
//       message.conversationId,
//       {
//         lastMessage:
//           message.text && message.text.length < 29
//             ? message.text
//             : message.text && message.text.length > 29
//             ? message.text.slice(0, 28)
//             : "shipping-img-new",
//       }
//     );
//   }