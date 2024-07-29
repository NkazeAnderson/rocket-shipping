import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { userT } from "@/types/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { userFormGroup } from "@/utils/contants";

function EditUserForm({ user }: { user: userT }) {
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const userInfo = data as userT;
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
        defaultValue={user.name}
        register={register}
        group={group}
      />
      <Input
        label="Email"
        placeholder="johndoe@gmail.com"
        type="email"
        name={"email"}
        defaultValue={user.email}
        register={register}
        group={group}
      />
      <Input
        label="Phone"
        placeholder="413 265 2766"
        type="text"
        name={"phone"}
        defaultValue={user.phone}
        register={register}
        group={group}
      />

      <Input
        label="Picture"
        placeholder="Profile Pic"
        type="file"
        name={"picture"}
        defaultValue={user.image}
        register={register}
        group={group}
      />
      <div className="w-full flex justify-center">
        <Button props={{ text: "Edit" }} />
      </div>
    </form>
  );
}

export default EditUserForm;
