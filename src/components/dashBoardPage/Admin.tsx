"use client";
import React, { useEffect, useState } from "react";
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
import { shipmentT, userT, withId } from "@/types/types";
import usePlacesAutocomplete from "use-places-autocomplete";

function Admin() {
  const [addOrEditToggle, setAddOrEditToggle] = useState("add");
  const [userOrPackageToggle, setUserOrPackageToggle] = useState("user");
  const [UsersList, setUsersList] = useState<(userT & { $id: string })[]>([]);
  const [shipmentsList, setShipmentsList] = useState<
    (shipmentT & { $id: string })[]
  >([]);
  const [selectedUser, setSelectedUser] = useState<number | undefined>(
    undefined
  );
  const [selectedShipment, setSelectedShipment] = useState<number | undefined>(
    undefined
  );
  const [updatePage, setupdatePage] = useState<boolean>(false);

  const group = { searchUser: "" };
  const methods = useForm<typeof group>();

  function adminCallbackSubscribtion(
    action: string,
    payload: Record<string, string>
  ) {
    console.log(action);

    // users

    if (
      action === "create" &&
      "$collectionId" in payload &&
      payload.$collectionId === userCollection
    ) {
      //@ts-ignore
      const newUser = payload as withId<userT>;
      setUsersList((prev) => [newUser, ...prev]);
    }
    if (
      action === "update" &&
      "$collectionId" in payload &&
      payload.$collectionId === userCollection
    ) {
      //@ts-ignore
      const newUser = payload as withId<userT>;
      setUsersList((prev) =>
        prev.map((value) => {
          if (value.$id === newUser.$id) {
            return newUser;
          }
          return value;
        })
      );
    }

    // shipments;
    if (
      action === "create" &&
      "$collectionId" in payload &&
      payload.$collectionId === shipmentCollection
    ) {
      //@ts-ignore
      const newShipment = payload as withId<shipmentT>;
      setShipmentsList((prev) => [newShipment, ...prev]);
    }
    if (
      action === "update" &&
      "$collectionId" in payload &&
      payload.$collectionId === shipmentCollection
    ) {
      //@ts-ignore
      const newShipment = payload as withId<shipmentT>;
      console.log("updated shipment");
      setShipmentsList((prev) =>
        prev.map((value) => {
          if (value.$id === newShipment.$id) {
            return newShipment;
          }
          return value;
        })
      );
    }
  }

  useEffect(() => {
    getUsers().then((res) => {
      setUsersList(res);
    });
    getShipments().then((res) => {
      setShipmentsList(res);
    });
    const unsubscribe = subscribeToAdmin(adminCallbackSubscribtion);
    return () => {
      unsubscribe();
    };
  }, [updatePage]);

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
              {UsersList.map((user, index) => (
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
          <AddPackageForm users={UsersList} />
        ) : addOrEditToggle === "edit" &&
          userOrPackageToggle === "user" &&
          selectedUser !== undefined ? (
          <EditUserForm
            user={UsersList[selectedUser]}
            id={UsersList[selectedUser].$id}
          />
        ) : (
          selectedShipment !== undefined && (
            <EditPackageForm
              shipment={shipmentsList[selectedShipment]}
              users={UsersList}
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
