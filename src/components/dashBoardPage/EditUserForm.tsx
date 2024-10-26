import React, { useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { userT } from "@/types/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { account, db, storage } from "@/utils/appwrite";
import { bucket, database, userCollection } from "@/utils/contants";
import { AppwriteException, ID, Query } from "appwrite";
import toast from "react-hot-toast";

function EditUserForm({ user, id }: { user: userT; id: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<userT>();
  const onSubmit: SubmitHandler<userT> = async (data) => {
    try {
      const image =
        data.image && Array.isArray(data.image)
          ? //@ts-ignore
            await storage.createFile(bucket, ID.unique(), data.image[0])
          : undefined;

      await db.updateDocument(database, userCollection, id, {
        name: data.name,
        email: data.email,
        phone: data.phone,
        image: image ? image.$id : data.image,
      });

      reset();
      toast.success("User info updated");
    } catch (error) {
      if (
        error instanceof AppwriteException &&
        error.message.includes("email")
      ) {
        toast.error("User already exist");
      } else {
        console.log(error);

        toast.error("Error editing user");
      }
    }
  };
  useEffect(() => {
    reset(user);
    console.log(user);
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-8">
      <Input
        label="Name"
        placeholder="John Doe"
        type="text"
        name={"name"}
        register={register}
      />
      <Input
        label="Email"
        placeholder="johndoe@gmail.com"
        type="email"
        name={"email"}
        register={register}
      />
      <Input
        label="Phone"
        placeholder="413 265 2766"
        type="text"
        name={"phone"}
        register={register}
      />

      <Input
        label="Picture"
        placeholder="Profile Pic"
        type="file"
        name={"image"}
        register={register}
      />
      <div className="w-full flex justify-center">
        <Button props={{ text: "Edit", pending: isSubmitting }} />
      </div>
    </form>
  );
}

export default EditUserForm;
