"use client";
import React, { useState } from "react";
import SectionTitle from "../SectionTitle";
import Input from "../ui/Input";
import { BiCheck } from "react-icons/bi";
import AddUserForm from "./AddUserForm";
import AddPackageForm from "./AddPackageForm";
import Toggler from "../ui/Toggler";
import { useForm } from "react-hook-form";
import EditUserForm from "./EditUserForm";
import EditPackageForm from "./EditPackageForm";
import { packages, shipments } from "@/utils/contants";

function Admin() {
  const [addOrEditToggle, setAddOrEditToggle] = useState("add");
  const [userOrPackageToggle, setUserOrPackageToggle] = useState("user");

  const { register } = useForm();
  return (
    <div className="w-full">
      <div className="rounded-30 bg-black text-white p-16 w-full ">
        <h2 className="text-center">Admin</h2>
      </div>
      <div className="w-full p-16">
        <div className="w-full mb-16">
          <h5 className="text-center"> Would you like to add or edit?</h5>
          <Toggler
            value={addOrEditToggle}
            values={["add", "edit"]}
            setValue={setAddOrEditToggle}
          />
        </div>
        <div className="w-full mb-16">
          <h5 className="text-center"> Would you like to {addOrEditToggle}</h5>
          <Toggler
            value={userOrPackageToggle}
            values={["user", "package"]}
            setValue={setUserOrPackageToggle}
          />
        </div>
        {/* search user */}
        {addOrEditToggle === "edit" && (
          <div className=" w-full ">
            <div className="mb-8">
              <Input
                label="Search"
                placeholder="Search for a user by name or email"
                type="search"
                name="searchUser"
                register={register}
              />
            </div>
            <div className="flex items-center py-[2] border-y-dark-gray border-y hover:cursor-pointer">
              <div className="flex-grow">
                <span className=" text-12">John Doe - johndoe@gmail.com</span>
              </div>
              <div className="p-8">
                <BiCheck size={25} className="text-success" />
              </div>
            </div>
          </div>
        )}

        <SectionTitle
          text={`${addOrEditToggle} ${userOrPackageToggle}`.toUpperCase()}
        />
        {addOrEditToggle === "add" && userOrPackageToggle === "user" ? (
          <AddUserForm register={register} />
        ) : addOrEditToggle === "add" && userOrPackageToggle === "package" ? (
          <AddPackageForm register={register} />
        ) : addOrEditToggle === "edit" && userOrPackageToggle === "user" ? (
          <EditUserForm register={register} />
        ) : (
          <EditPackageForm register={register} shipment={shipments[0]} />
        )}

        <span className="p-40"></span>
        <hr />
        <span className="p-40"></span>
      </div>
    </div>
  );
}

export default Admin;
