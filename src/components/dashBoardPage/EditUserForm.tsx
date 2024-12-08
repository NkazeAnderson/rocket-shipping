import React, { useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import {
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {  addNewFile,UpdateUser } from "@/utils/appwrite";
import { AppwriteException } from "appwrite";
import toast from "react-hot-toast";
import { userT } from "@/types/schemas";

function EditUserForm({ user}: { user: userT;}) {
  const methods = useForm<userT>();
  const onSubmit: SubmitHandler<userT> = async (data) => {
    try {   
     await UpdateUser(data)
      methods.reset();
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
    methods.reset(user);
  }, [user]);

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
            props={{ text: "Edit", pending: methods.formState.isSubmitting }}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default EditUserForm;
