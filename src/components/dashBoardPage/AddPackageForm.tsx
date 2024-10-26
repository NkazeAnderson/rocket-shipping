import React from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import {
  bucket,
  database,
  modes,
  packages,
  paymentModes,
  shipmentCollection,
  shipmentFormGroup,
  shipmentHistoryCollection,
} from "@/utils/contants";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { packageT, shipmentHistoryT, shipmentT, userT } from "@/types/types";
import { db, storage } from "@/utils/appwrite";
import { ID } from "appwrite";
import toast from "react-hot-toast";

function AddPackageForm({ users }: { users: (userT & { $id: string })[] }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<shipmentT>();
  const onSubmit: SubmitHandler<shipmentT> = async (data) => {
    try {
      let imageId = "";
      data.courier = users[Number(data.courier)].$id;
      data.receiver = users[Number(data.receiver)].$id;
      console.log(data.image);

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
      data.action = "None";

      const shipmentId = ID.unique();
      await db.createDocument(database, shipmentCollection, shipmentId, data);
      const shipmentHistory: shipmentHistoryT = {
        currentCityStateCountry: data.originCityStateCountry,
        currentStreet: data.originStreet,
        currentZip: data.originZip,
        status: "Registered",
        date: data.pickupDate,
        shipmentId,
      };
      await db.createDocument(
        database,
        shipmentHistoryCollection,
        ID.unique(),
        shipmentHistory
      );
      reset();
      toast.success("Successfully added package");
    } catch (error) {
      console.log(error);

      toast.error("Error adding package");
    }
  };

  return (
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
        max={10000}
        name="weight"
        register={register}
        required
      />
      <Input
        label="Image"
        placeholder="image"
        type="file"
        name="image"
        register={register}
      />

      <div className="w-full flex justify-center">
        <Button props={{ text: "Add", pending: isSubmitting }} />
      </div>
    </form>
  );
}

export default AddPackageForm;
