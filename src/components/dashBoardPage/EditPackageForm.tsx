import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import {
  formRegisterT,
  shipmentHistoryT,
  shipmentT,
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
  shipmentFormGroup,
  shipmentHistoryCollection,
  status,
  users,
} from "@/utils/contants";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ID, Query } from "appwrite";
import { db, storage } from "@/utils/appwrite";
import EditShipmentHistoryForm from "./EditShipmentHistoryForm";

function EditPackageForm({
  shipment,
  users,
}: {
  shipment: shipmentT & { $id: string };
  users: (userT & { $id: string })[];
}) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<shipmentT>();
  const [shipmentHistoryList, setShipmentHistoryList] =
    useState<(shipmentHistoryT & { $id: string })[]>();
  const [editHistory, setEditHistory] = useState<undefined | number>();

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
      console.log(shipment);
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
      reset();
      toast.success("Successfully editted shipment");
    } catch (error) {
      console.log(error);
      toast.error("Error editing shipment");
    }
  };

  async function getHistory() {
    const historyRef = await db.listDocuments(
      database,
      shipmentHistoryCollection,
      [Query.equal("shipmentId", shipment.$id)]
    );
    //@ts-ignore
    return historyRef.documents as (shipmentHistoryT & { $id: string })[];
  }

  useEffect(() => {
    if (typeof shipment.receiver === "number") {
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
    shipment.courier = users.findIndex((item) => item.$id === shipment.courier);
    //@ts-ignore
    shipment.receiver = users.findIndex(
      (item) => item.$id === shipment.receiver
    );
    //@ts-ignore
    shipment.action = actions.findIndex((item) => item === shipment.action);
    //@ts-ignore
    shipment.pickupDate = shipment.pickupDate.split("T")[0];
    //@ts-ignore
    shipment.deliveryDate = shipment.deliveryDate.split("T")[0];
    reset(shipment);
    getHistory()
      .then((res) => {
        setShipmentHistoryList(res);
      })
      .catch((e) => {
        toast.error("Error fetching history");
        console.log(e);
      });
  }, [shipment]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" action="">
        <Input
          label="Shipper's Name"
          placeholder="John Doe"
          type="text"
          name="shipperName"
          register={register}
          required
        />
        <Input
          label="Shipper's Email"
          placeholder="Johndoe@gmail.com"
          type="email"
          name="shipperEmail"
          register={register}
          required
        />
        <Input
          label="Origin Street"
          placeholder="123 binton Ave E"
          type="text"
          name="originStreet"
          register={register}
          required
        />
        <Input
          label="Origin City, State, Country"
          placeholder="New York, NY, USA"
          type="text"
          name="originCityStateCountry"
          register={register}
          required
        />
        <Input
          label="Origin Zip"
          placeholder="07261"
          type="text"
          name="originZip"
          register={register}
          required
        />

        <Input
          label="Receiver"
          placeholder="Select Receiver"
          type="options"
          options={users.map((user) => `${user.name} - ${user.email}`)}
          name="receiver"
          register={register}
          required
        />
        <Input
          label="Destination Street"
          placeholder="123 seashore w"
          type="text"
          name="destinationStreet"
          register={register}
          required
        />
        <Input
          label="Destination City, State, Country"
          placeholder="Miami, FL, USA"
          type="text"
          name="destinationCityStateCountry"
          register={register}
          required
        />
        <Input
          label="Destination Zip"
          placeholder="17652"
          type="text"
          name="destinationZip"
          register={register}
          required
        />

        <Input
          label="Courier"
          placeholder="Select Receiver"
          type="options"
          options={users.map((user, index) => `${user.name} - ${user.email}`)}
          name="courier"
          register={register}
          required
        />

        <Input
          label="PickUp Date"
          placeholder="Date"
          type="date"
          name="pickupDate"
          register={register}
          required
        />
        <Input
          label="Delivery Date"
          placeholder="Date"
          type="date"
          name="deliveryDate"
          register={register}
          required
        />
        <Input
          label="ETA"
          placeholder="Expected Time of Arrival"
          type="time"
          name="eta"
          register={register}
          required
        />
        <Input
          label="Product"
          placeholder="Car"
          type="text"
          name="product"
          register={register}
          required
        />
        <Input
          label="Package"
          placeholder="Crate"
          type="options"
          name="package"
          options={packages}
          register={register}
          required
        />
        <Input
          label="Shipment Mode"
          placeholder="Select Mode"
          type="options"
          options={modes}
          name="mode"
          register={register}
          required
        />
        <Input
          label="Payment Method"
          placeholder="Select Mode"
          type="options"
          options={paymentModes}
          name="paymentMethod"
          register={register}
          required
        />
        <Input
          label="Quantity"
          placeholder="1"
          type="number"
          min={1}
          max={10}
          name="quantity"
          register={register}
          required
        />
        <Input
          label="Weight in Kg"
          placeholder="1"
          type="number"
          min={1}
          max={1000}
          name="weight"
          register={register}
          required
        />
        <Input
          label="Update required action"
          placeholder="Insurance"
          type="options"
          options={actions}
          name="action"
          register={register}
        />
        <Input
          label="Image"
          placeholder="image"
          type="file"
          name="image"
          register={register}
        />

        <div className="w-full flex justify-center">
          <Button props={{ text: "Edit", pending: isSubmitting }} />
        </div>
      </form>
      <div className="mt-24"></div>
      <h3 className="py-16">Shipment History</h3>
      {typeof editHistory !== "undefined" && shipmentHistoryList?.length && (
        <>
          <h4>Edit</h4>
          <EditShipmentHistoryForm history={shipmentHistoryList[editHistory]} />
        </>
      )}
      <table className=" w-full " style={{ overflowX: "scroll" }}>
        <tr>
          <th>Edit</th>
          <th>Location</th>
          <th>Status</th>
          <th>date</th>
        </tr>
        {shipmentHistoryList?.map((history, index) => (
          <tr>
            <td>
              <button
                className="p-2 border rounded bg-secondary text-primary underline text-center hover:cursor-pointer"
                onClick={() => {
                  setEditHistory(index);
                  console.log("editHistory");
                }}
              >
                Edit
              </button>
            </td>
            <td className=" text-center">{`${history.currentStreet}, ${history.currentCityStateCountry}, ${history.currentZip}`}</td>
            <td className=" text-center">{`${history.status}`}</td>
            <td className=" text-center"> {`${history.date.split("T")[0]}`}</td>
          </tr>
        ))}
      </table>
    </>
  );
}

export default EditPackageForm;
