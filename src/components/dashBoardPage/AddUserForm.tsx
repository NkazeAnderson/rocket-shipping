import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { formRegisterT, signUpFormT, userT } from "@/types/types";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { bucket, database, userCollection } from "@/utils/contants";
import { account, db, storage } from "@/utils/appwrite";
import { AppwriteException, ID, Query } from "appwrite";
import toast from "react-hot-toast";

function AddUserForm() {
  const methods = useForm<userT>();
  const onSubmit: SubmitHandler<userT> = async (data) => {
    if (data.access && data.email && data.name) {
      try {
        const user = await db.listDocuments(database, userCollection, [
          Query.equal("email", data.email.trim()),
        ]);
        if (user.total === 0) {
          const id = ID.unique();
          //@ts-ignore

          const image = data.image?.length
            ? //@ts-ignore
              await storage.createFile(bucket, id, data.image[0])
            : undefined;

          await db.createDocument(database, userCollection, id, {
            name: data.name,
            email: data.email,
            phone: data.phone,
            image: image ? image.$id : undefined,
          });
          await account.create(id, data.email, data.access, data.name);
          methods.reset();
          toast.success("Account created");
        }
      } catch (error) {
        if (
          error instanceof AppwriteException &&
          error.message.includes("email")
        ) {
          toast.error("User already exist");
        } else {
          toast.error("Error adding new user");
          console.log(error);
        }
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className=" space-y-8">
        <Input label="Name" placeholder="John Doe" type="text" name={"name"} />
        <Input
          label="Email"
          placeholder="johndoe@gmail.com"
          type="email"
          name={"email"}
        />
        <Input
          label="Phone"
          placeholder="413 265 2766"
          type="text"
          name={"phone"}
        />
        <Input
          label="Access Key"
          placeholder="Access Key"
          type="text"
          name={"access"}
        />
        <Input
          label="Picture"
          placeholder="Profile Pic"
          type="file"
          name={"image"}
        />
        <div className="w-full flex justify-center">
          <Button
            props={{ text: "Add", pending: methods.formState.isSubmitting }}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default AddUserForm;
