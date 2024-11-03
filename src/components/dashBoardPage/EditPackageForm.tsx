import React, { useEffect, useMemo, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import {
  formRegisterT,
  shipmentHistoryT,
  shipmentT,
  shipmentWithHistoryT,
  userT,
} from "@/types/types";
import {
  actions,
  bucket,
  database,
  modes,
  packages,
  paymentModes,
  shipmentCollection,
} from "@/utils/contants";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { ID, Query } from "appwrite";
import { db, getHistory, storage } from "@/utils/appwrite";
import EditShipmentHistoryForm from "./EditShipmentHistoryForm";
import AddShipmentHistoryForm from "./AddShipmentHistoryForm";
import { getLatLong } from "@/utils";

function EditPackageForm({
  shipmentWithHistory,
  users,
}: {
  shipmentWithHistory: shipmentWithHistoryT;
  users: (userT & { $id: string })[];
}) {
  const methods = useForm<shipmentT>();
  const shipment = useMemo(() => {
    return { ...shipmentWithHistory.shipment };
  }, [shipmentWithHistory]);

  const shipmentHistoryList = shipmentWithHistory.histories;
  const [editHistory, setEditHistory] = useState<undefined | number>();
  const [addHistory, setAddHistory] = useState<boolean>(false);

  const onSubmit: SubmitHandler<shipmentT> = async (data) => {
    try {
      let imageId = "";
      data.courier = users[Number(data.courier)].$id;
      data.receiver = users[Number(data.receiver)].$id;

      if (
        data.image &&
        typeof data.image !== "string" &&
        typeof data.image !== "undefined" &&
        data.image.length
      ) {
        imageId = ID.unique();
        await storage.createFile(bucket, imageId, data.image[0]);
        data.image = imageId;
      } else {
        delete data.image;
      }
      data.quantity = Number(data.quantity);
      data.weight = Number(data.weight);
      data.mode = modes[Number(data.mode)];
      data.package = packages[Number(data.package)];
      data.paymentMethod = paymentModes[Number(data.paymentMethod)];
      data.action = actions[Number(data.action)];

      if (data.origin !== shipment.origin) {
        const originCords = await getLatLong(data.origin);
        data.originLat = originCords.lat;
        data.originLong = originCords.lng;
      }
      if (data.destination !== shipment.destination) {
        const destinationCords = await getLatLong(data.destination);
        data.destinationLat = destinationCords.lat;
        data.destinationLong = destinationCords.lng;
      }
      //@ts-ignore
      data.$collectionId && delete data.$collectionId;
      //@ts-ignore
      data.$createdAt && delete data.$createdAt;
      //@ts-ignore
      data.$databaseId && delete data.$databaseId;
      //@ts-ignore
      data.$permissions && delete data.$permissions;
      //@ts-ignore
      data.$updatedAt && delete data.$updatedAt;
      //@ts-ignore
      data.$id && delete data.$id;

      await db.updateDocument(database, shipmentCollection, shipment.$id, data);
      methods.reset();
      toast.success("Successfully editted shipment");
    } catch (error) {
      console.log(error);
      toast.error("Error editing shipment");
    }
  };

  useEffect(() => {
    console.log("at edit");
    console.log(users);
    console.log(shipment.courier);

    if (typeof shipment.receiver === "number") {
      return;
    }
    if (!users.length || !shipment) {
      return;
    }
    //@ts-ignore
    shipment.mode = modes.findIndex((item) => item === shipment.mode);
    //@ts-ignore
    shipment.package = packages.findIndex((item) => item === shipment.package);
    //@ts-ignore
    shipment.paymentMethod = paymentModes.findIndex(
      (item) => item === shipment.paymentMethod
    );
    //@ts-ignore
    shipment.courier = users.findIndex(
      //@ts-ignore
      (item) => item.$id === shipment.courier.$id
    );
    //@ts-ignore
    shipment.receiver = users.findIndex(
      //@ts-ignore
      (item) => item.$id === shipment.receiver.$id
    );
    //@ts-ignore
    shipment.action = actions.findIndex((item) => item === shipment.action);
    //@ts-ignore
    shipment.pickupDate = shipment.pickupDate.split("T")[0];
    //@ts-ignore
    shipment.deliveryDate = shipment.deliveryDate.split("T")[0];

    methods.reset(shipment);
  }, [shipment, users]);

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-8"
          action=""
        >
          <Input
            label="Shipper's Name"
            placeholder="John Doe"
            type="text"
            name="shipperName"
            required
          />
          <Input
            label="Shipper's Email"
            placeholder="Johndoe@gmail.com"
            type="email"
            name="shipperEmail"
            required
          />
          <Input
            label="Origin"
            placeholder="123 binton Ave E"
            type="text"
            name="origin"
            required
            location
          />

          <Input
            label="Receiver"
            placeholder="Select Receiver"
            type="options"
            options={users.map((user) => `${user.name} - ${user.email}`)}
            name="receiver"
            required
          />
          <Input
            label="Destination"
            placeholder="123 seashore w"
            type="text"
            name="destination"
            location
            required
          />

          <Input
            label="Courier"
            placeholder="Select Receiver"
            type="options"
            options={users
              .filter((value) => value.isAdmin)
              .map((user, index) => `${user.name} - ${user.email}`)}
            name="courier"
            required
          />

          <Input
            label="PickUp Date"
            placeholder="Date"
            type="date"
            name="pickupDate"
            required
          />
          <Input
            label="Delivery Date"
            placeholder="Date"
            type="date"
            name="deliveryDate"
            required
          />
          <Input
            label="ETA"
            placeholder="Expected Time of Arrival"
            type="time"
            name="eta"
            required
          />
          <Input
            label="Product"
            placeholder="Car"
            type="text"
            name="product"
            required
          />
          <Input
            label="Package"
            placeholder="Crate"
            type="options"
            name="package"
            options={packages}
            required
          />
          <Input
            label="Shipment Mode"
            placeholder="Select Mode"
            type="options"
            options={modes}
            name="mode"
            required
          />
          <Input
            label="Payment Method"
            placeholder="Select Mode"
            type="options"
            options={paymentModes}
            name="paymentMethod"
            required
          />
          <Input
            label="Quantity"
            placeholder="1"
            type="number"
            min={1}
            max={10}
            name="quantity"
            required
          />
          <Input
            label="Weight in Kg"
            placeholder="1"
            type="number"
            min={1}
            max={1000}
            name="weight"
            required
          />
          <Input
            label="Update required action"
            placeholder="Insurance"
            type="options"
            options={actions}
            name="action"
          />
          <Input label="Image" placeholder="image" type="file" name="image" />

          <div className="w-full flex justify-center">
            <Button
              props={{ text: "Edit", pending: methods.formState.isSubmitting }}
            />
          </div>
        </form>
      </FormProvider>
      <div className="mt-24"></div>
      <h3 className="py-16">Shipment History</h3>
      <div className="flex flex-row items-center justify-center my-32">
        <button
          onClick={() => {
            setAddHistory((prev) => !prev);
          }}
          className="py-8 px-16 border border-success text-success rounded-30"
        >
          {addHistory ? "Cancel addition" : "Add New History"}
        </button>
      </div>
      {addHistory && (
        <div className="py-8">
          <AddShipmentHistoryForm
            shipmentId={shipment.$id}
            hide={() => {
              setAddHistory(false);
            }}
          />
        </div>
      )}

      <table className=" w-full " style={{ overflowX: "scroll" }}>
        <tr>
          <th>Edit</th>
          <th>Location</th>
          <th>Status</th>
          <th>date</th>
        </tr>
      </table>
      {shipmentHistoryList?.map((history, index) => (
        <>
          <div className="flex flex-row overflow-x-auto items-center justify-around">
            <div
              onClick={() => {
                console.log("editHistory");
                setEditHistory(index);
              }}
              className="p-4  rounded bg-secondary text-primary underline text-center hover:cursor-pointer"
            >
              Edit history
            </div>
            <div className=" text-center">{`${history.currentLocation}`}</div>
            <div className=" text-center">{`${history.status}`}</div>
            <div className=" text-center">
              {" "}
              {`${history.date.split("T")[0]}`}
            </div>
          </div>
          {typeof editHistory !== "undefined" &&
            editHistory === index &&
            shipmentHistoryList?.length && (
              <>
                <div className="flex flex-row justify-between items-center py-16">
                  <h4>Edit</h4>
                  <p
                    onClick={() => {
                      setEditHistory(undefined);
                    }}
                    className=" text-danger "
                  >
                    x
                  </p>
                </div>
                <EditShipmentHistoryForm
                  history={shipmentHistoryList[editHistory]}
                  hide={() => {
                    setEditHistory(undefined);
                  }}
                />
              </>
            )}
        </>
      ))}
    </>
  );
}

export default EditPackageForm;
