import { userSchema, userT } from "@/types/schemas";
import { account, addNewFile, db, getImageUrl } from "../appwrite";
import { database, defaultAccess, userCollection } from "../contants";
import { ID, Query } from "appwrite";
import { getFromLocalStore, saveToLocalStore, stripOutAppwriteMetaData } from "..";

function prepareUserForDb(user:userT) {
  user.access &&  delete user.access
    user.extras && delete user.extras
    stripOutAppwriteMetaData(user)
    return userSchema.omit({$id:true}).parse(user)
}

export async function getMyInfo():Promise<userT> {
    const data = await account.get();
    const request =  db.listDocuments(database, userCollection, [
      Query.equal("email", data.email),
    ])
    const userInfo = (await request).documents[0]
    request.then(user=>{
      saveToLocalStore("myInfo", user.documents[0])
      console.log(user.documents[0]);  
    });
    const user:userT = userSchema.parse(userInfo)
    if (user.image) {
      const imageUrl = getImageUrl(user.image)
      if (user.extras){
        user.extras.imageUrl = imageUrl
      }
      else {
        user.extras = {imageUrl}
      }
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
  !(await getAuthStatus()) &&  await account.createEmailPasswordSession(email, password);
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
    const user:userT = userSchema.parse(userInfo)
    if (user.image) {
      const imageUrl = getImageUrl(user.image)
      if (user.extras){
        user.extras.imageUrl = imageUrl
      }
      else {
        user.extras = {imageUrl}
      }
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
    const userExist =await CheckIfUserWithEmailExist(user.email.trim())
    if (userExist) {
      throw new Error("user already exist")
    }      
      const image = user.extras?.imageToUpload?.length
        ? 
          await addNewFile(user.extras.imageToUpload[0])
        : undefined;
      if (image) {
        user.image = image
      }
    if (!user.access) {
        user.access = defaultAccess
    }
    const id = ID.unique()
    await account.create(id, user.email, user.access, user.name);
    
    await db.createDocument(database, userCollection, id, prepareUserForDb(user)  );
    return id
  }

  export async function UpdateUser(user:userT){ 
    const image = user.extras?.imageToUpload?.length
    ? 
      await addNewFile(user.extras?.imageToUpload[0])
    : undefined;
  if (image) {
    user.image = image
  }
  debugger
    await db.updateDocument(database, userCollection, user.$id, prepareUserForDb(user));
  }