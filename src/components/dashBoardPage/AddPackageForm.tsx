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
  shipmentHistoryCollection,
} from "@/utils/contants";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  packageT,
  shipmentHistoryT,
  shipmentT,
  userT,
  withId,
} from "@/types/types";
import { db, storage } from "@/utils/appwrite";
import { ID } from "appwrite";
import toast from "react-hot-toast";
import { getLatLong } from "@/utils";

function AddPackageForm({ users }: { users: withId<userT>[] }) {
  const methods = useForm<shipmentT>();
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
      const originCords = await getLatLong(data.origin);
      const destinationCords = await getLatLong(data.destination);
      data.originLat = originCords.lat;
      data.originLong = originCords.lng;
      data.destinationLat = destinationCords.lat;
      data.destinationLong = destinationCords.lng;

      const shipmentId = ID.unique();
      await db.createDocument(database, shipmentCollection, shipmentId, data);
      const shipmentHistory: shipmentHistoryT = {
        currentLocation: data.origin,
        currentLat: data.originLat,
        currentLong: data.originLong,
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
      methods.reset();
      toast.success("Successfully added package");
    } catch (error) {
      console.log(error);

      toast.error("Error adding package");
    }
  };

  return (
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
          placeholder="123 binton Ave E, New York, NY"
          type="text"
          name="origin"
          location
          required
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
          placeholder="123 seashore, center town, oregon"
          type="text"
          name="destination"
          location
          required
        />

        <Input
          label="Courier"
          placeholder="Select Receiver"
          type="options"
          options={users.map((user, index) => `${user.name} - ${user.email}`)}
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
          max={10000}
          name="weight"
          required
        />
        <Input label="Image" placeholder="image" type="file" name="image" />

        <div className="w-full flex justify-center">
          <Button
            props={{ text: "Add", pending: methods.formState.isSubmitting }}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default AddPackageForm;
