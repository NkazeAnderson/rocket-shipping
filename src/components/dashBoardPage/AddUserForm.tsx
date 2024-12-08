import React, { useCallback } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { defaultAccess,  } from "@/utils/contants";
import { addNewFile, addNewUserToAccountandDb, CheckIfUserWithEmailExist, db, storage } from "@/utils/appwrite";
import { AppwriteException} from "appwrite";
import toast from "react-hot-toast";
import { userSchema, userT } from "@/types/schemas";

function AddUserForm() {
  const methods = useForm<userT>({defaultValues:{
    access: defaultAccess
  }});
  const onSubmit: SubmitHandler<userT> = useCallback( async (data) => {
    if (data.email && data.name) {
      try {
          await addNewUserToAccountandDb(data)
          methods.reset();
          toast.success("Account created");   
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
  }, []) 
 ;

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
          label="Picture"
          placeholder="Profile Pic"
          type="file"
          name={"extras.imageToUpload"}
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
