import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { formRegisterT, userFormGroupT, userT } from "@/types/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { userFormGroup } from "@/utils/contants";

function AddUserForm() {
  const { register, handleSubmit } = useForm<userFormGroupT>();
  const onSubmit: SubmitHandler<userFormGroupT> = (data) => {
    const userInfo = data;
    alert(JSON.stringify(data));
  };
  const group = userFormGroup;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-8" action="">
      <Input
        label="Name"
        placeholder="John Doe"
        type="text"
        name={"name"}
        register={register}
        group={group}
      />
      <Input
        label="Email"
        placeholder="johndoe@gmail.com"
        type="email"
        name={"email"}
        register={register}
        group={group}
      />
      <Input
        label="Phone"
        placeholder="413 265 2766"
        type="text"
        name={"phone"}
        register={register}
        group={group}
      />
      <Input
        label="Access Key"
        placeholder="Access Key"
        type="text"
        name={"access"}
        register={register}
        group={group}
      />
      <Input
        label="Picture"
        placeholder="Profile Pic"
        type="file"
        name={"picture"}
        register={register}
        group={group}
      />
      <div className="w-full flex justify-center">
        <Button props={{ text: "Add" }} />
      </div>
    </form>
  );
}

export default AddUserForm;
