import { notificationSchema, notificationT, userT } from "@/types/schemas";
import { db } from "../appwrite";
import { database, notificationCollection } from "../contants";
import { ID } from "appwrite";
import { stripOutAppwriteMetaData } from "..";

export async function getNotifications(user:userT) {
    let notificationsList = []
    if (user.notifications?.length) {
      for(let notificationId of user.notifications) {
        const notification = await getNotification(notificationId)
        notificationsList.push(notification)
      }
      
    }
 
    const notifications = notificationSchema.array().parse(notificationsList)
    return notifications
}

export async function getNotification(notificationId:string) {
  const notification =  await db.getDocument(database, notificationCollection, notificationId)
  return notification
}
export async function addNotification(notification:notificationT) {
  const id = ID.unique()
  await db.createDocument(database, notificationCollection,id, stripOutAppwriteMetaData(notification) )
  return id
}