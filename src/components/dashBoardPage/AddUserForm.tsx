import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { formRegisterT } from "@/types/types";

function AddUserForm({ register }: { register: formRegisterT }) {
  return (
    <form className=" space-y-8" action="">
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
        label="Password"
        placeholder="password"
        type="text"
        name={"password"}
        register={register}
      />
      <Input
        label="Picture"
        placeholder="Profile Pic"
        type="file"
        name={"picture"}
        register={register}
      />
      <div className="w-full flex justify-center">
        <Button props={{ text: "Add" }} />
      </div>
    </form>
  );
}

export default AddUserForm;
