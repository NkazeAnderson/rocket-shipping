"use client";
import React, { useContext, useEffect, useMemo, useState } from "react";
import SectionTitle from "../SectionTitle";
import Input from "../ui/Input";
import { BiCheck } from "react-icons/bi";
import AddUserForm from "./AddUserForm";
import AddPackageForm from "./AddPackageForm";
import Toggler from "../ui/Toggler";
import { FormProvider, useForm } from "react-hook-form";
import EditUserForm from "./EditUserForm";
import EditPackageForm from "./EditPackageForm";
import {
  database,
  packages,
  shipmentCollection,
  shipments,
  userCollection,
  users,
} from "@/utils/contants";
import { db, getShipments, getUsers, subscribeToAdmin } from "@/utils/appwrite";
import { Query } from "appwrite";
import { appContextT, shipmentT, userT, withId } from "@/types/types";
import usePlacesAutocomplete from "use-places-autocomplete";
import { AppContext } from "../ContextProviders/AppProvider";

function Admin() {
  const [addOrEditToggle, setAddOrEditToggle] = useState("add");
  const [userOrPackageToggle, setUserOrPackageToggle] = useState("user");

  const [selectedUser, setSelectedUser] = useState<number | undefined>(
    undefined
  );
  const [selectedShipment, setSelectedShipment] = useState<number | undefined>(
    undefined
  );
  const [updatePage, setupdatePage] = useState<boolean>(false);

  const group = { searchUser: "" };
  const methods = useForm<typeof group>();
  const { shipments, users } = useContext(AppContext) as appContextT;

  const shipmentsList = useMemo(() => {
    return shipments.map((value) => value.shipment);
  }, [shipments]);
  useEffect(() => {
    selectedShipment && console.log("At admin", shipments[selectedShipment]);
  }, [selectedShipment]);

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
        <FormProvider {...methods}>
          {/* search user */}
          {addOrEditToggle === "edit" && userOrPackageToggle === "user" && (
            <div className=" w-full ">
              <div className="mb-8">
                <Input
                  label="Search"
                  placeholder="Search for a user by name or email"
                  type="search"
                  name="searchUser"
                />
              </div>
              {users.map((user, index) => (
                <div
                  key={user.email}
                  onClick={() => {
                    setSelectedUser(index);
                  }}
                  className="flex items-center py-[2] border-y-dark-gray border-y hover:cursor-pointer"
                >
                  <div className="flex-grow">
                    <span className=" text-12">{`${user.name} - ${user.email}`}</span>
                  </div>
                  <div className="p-8">
                    {selectedUser === index && (
                      <BiCheck size={25} className="text-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* search shipment */}
          {addOrEditToggle === "edit" && userOrPackageToggle !== "user" && (
            <div className=" w-full ">
              <div className="mb-8">
                <Input
                  label="Search"
                  placeholder="Search for a user by name or email"
                  type="search"
                  name="searchUser"
                />
              </div>
              {shipmentsList.map((shipment, index) => (
                <div
                  key={shipment.$id}
                  onClick={() => {
                    setSelectedShipment(index);
                  }}
                  className="flex items-center py-[2] border-y-dark-gray border-y hover:cursor-pointer"
                >
                  <div className="flex-grow">
                    <span className=" text-12">{`${shipment.shipperName} - ${shipment.product} - ${shipment.destination}`}</span>
                  </div>
                  <div className="p-8">
                    {selectedShipment === index && (
                      <BiCheck size={25} className="text-success" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </FormProvider>

        <SectionTitle
          text={`${addOrEditToggle} ${userOrPackageToggle}`.toUpperCase()}
        />

        {addOrEditToggle === "add" && userOrPackageToggle === "user" ? (
          <AddUserForm />
        ) : addOrEditToggle === "add" && userOrPackageToggle === "package" ? (
          <AddPackageForm users={users} />
        ) : addOrEditToggle === "edit" &&
          userOrPackageToggle === "user" &&
          selectedUser !== undefined ? (
          <EditUserForm
            user={users[selectedUser]}
            id={users[selectedUser].$id}
          />
        ) : (
          selectedShipment !== undefined && (
            <EditPackageForm
              shipmentWithHistory={shipments[selectedShipment]}
              users={users}
            />
          )
        )}

        <span className="p-40"></span>
        <hr />
        <span className="p-40"></span>
      </div>
    </div>
  );
}

export default Admin;
