import { ID, Query } from "appwrite";
import { conversationCollection, database, messageCollection } from "../contants";
import { db, getImageUrl, getUserById } from "../appwrite";
import { conversationSchema, conversationT, messageSchema, messageT, userT } from "@/types/schemas";
import { stripOutAppwriteMetaData } from "..";

function prepareConversationForDb(conversation:conversationT) {
  conversation.extras && delete conversation.extras
  return stripOutAppwriteMetaData(conversationSchema.omit({$id:true}).parse(conversation))
}

function prepareMessageForDb(message:messageT){
  message.extras && delete message.extras
  return stripOutAppwriteMetaData(messageSchema.omit({$id:true}).parse(message))
}
export async function addConversation(conversation: conversationT) {
    const id = ID.unique()
    await db.createDocument(
        database,
        conversationCollection,
        id,
        prepareConversationForDb(conversation) 
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
  export async function getMessages(conversationId:string) {
    const messagesRef =  await db.listDocuments(database, messageCollection, [Query.equal("conversationId", conversationId)])
    return messageSchema.array().parse(messagesRef.documents)
  }
  export async function getConversations(user: userT) {
    let conversationsList = []
    if (user.conversations?.length) {
      for(let conversationId of user.conversations) {
        const conversation = await db.getDocument(database, conversationCollection, conversationId)
        conversationsList.push(conversation)
      }
      
    }
 
    const conversations = conversationSchema.array().parse(conversationsList)
    
    for(let conversationIndex in conversations) {
      const index= Number(conversationIndex)
      const conversation:conversationT = conversations[index]
      const extras:conversationT["extras"] = {
        messages: await getMessages(conversation.$id),
        member1Info: await getUserById(conversation.member1),
        member2Info:await getUserById(conversation.member2),
      }
      conversation.extras = extras
    }
    return conversations;
  }


  
  export async function getMessage(messageId: string) {
    const messageRef = await db.getDocument(database, messageCollection, messageId);
    const message:messageT = messageSchema.parse(messageRef)
    message.extras = {imageUrl: message.image ? getImageUrl(message.image): undefined}
    return message
  
  }
  
  export async function sendMessage(message: messageT) {
    const id = ID.unique()
    await db.createDocument(database, messageCollection, id , prepareMessageForDb(message));
    const conversation: Partial<conversationT> ={
      lastMessageId: id
    }
    await db.updateDocument(
      database,
      conversationCollection,
      message.conversationId,
      conversation
    );
  }