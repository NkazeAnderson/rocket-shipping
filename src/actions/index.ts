"use server";
import { account } from "@/utils/appwrite";
import { ID } from "appwrite";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function signUp(prevState: unknown, data: FormData) {
  const email = data.get("email") as string;
  const name = data.get("name") as string;
  const access = data.get("access") as string;

  if (email && name && access) {
    account.create(ID.unique(), email, access, name);
    return "ok";
  } else {
    return "Invalid Data";
  }
}
export async function logIn(email: string) {
  cookies().set("loggedIn", "true");
  cookies().set("userEmail", email);
  revalidatePath("/dashboard");
  return "ok";
}
export async function logOut() {
  // account.createEmailPasswordSession(email, access);
  cookies().delete("loggedIn");
  revalidatePath("/dashboard");
  return "ok";
}
export async function setAlert(alert1: string) {
  console.log("Ser5ver");

  cookies().set("alert", "oki");
  return "ok";
}
