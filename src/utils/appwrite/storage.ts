import { ID } from "appwrite";
import { storage } from "../appwrite";
import { bucket } from "../contants";

export async function addNewFile(file:File) {
    const id = ID.unique()
    const {$id}=  await storage.createFile(bucket, id, file)
    return $id
}


export function getImageUrl(id: string) {
    return storage.getFilePreview(bucket, id).href;
  }