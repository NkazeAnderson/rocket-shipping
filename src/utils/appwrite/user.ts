import { userSchema, userT } from "@/types/schemas";
import { account, db, getImageUrl } from "../appwrite";
import { database, defaultAccess, userCollection } from "../contants";
import { ID, Query } from "appwrite";
import { getFromLocalStore, saveToLocalStore } from "..";

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

  export async function getUserById(id: string) {
    const userInfo = await db.getDocument(
      database,
      userCollection,
      id
    )
    const user = userSchema.parse(userInfo)
    if (user.image) {
      user.image = getImageUrl(user.image);
    }
    return user;
  }

  export async function CheckIfUserWithEmailExist(email:string){
    const user = await db.listDocuments(database, userCollection, [
        Query.equal("email", email),
      ]);
      
    if (user.total) return true
    return false
  }

  export async function addNewUserToAccountandDb(user:userT){
    if (!user.access) {
        user.access = defaultAccess
    }
    const id = ID.unique()
    await db.createDocument(database, userCollection, id, user);
    await account.create(id, user.email, user.access, user.name);
    return id
  }