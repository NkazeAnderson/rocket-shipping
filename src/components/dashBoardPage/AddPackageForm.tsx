import React, { useContext } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { defaultAccess, modes, packages, paymentModes } from "@/utils/contants";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import {
  addConversation,
  addNewFile,
  addNotification,
  addShipment,
  addShipmentHistory,
  db,
  getConversationId,
  storage,
  UpdateUser,
} from "@/utils/appwrite";
import toast from "react-hot-toast";
import { getLatLong } from "@/utils";
import { notificationT, shipmentT, userT } from "@/types/schemas";
import { AppContext } from "../ContextProviders/AppProvider";
import { appContextT } from "@/types/types";
import { sendEmail } from "@/utils/appwrite/emailer";

function AddPackageForm() {
  const {
    userMethods: { users, user },
    shipmentsMethods: { shipments },
  } = useContext(AppContext) as appContextT;
  const methods = useForm<shipmentT>();

  const onSubmit: SubmitHandler<shipmentT> = async (data) => {
    try {
      const receiver = users.find((item) => item.$id === data.receiver);
      if (receiver && user) {
        if (data.extras) {
          data.extras.courierInfo = user;
          data.extras.receiverInfo = receiver;
        } else {
          data.extras = {
            courierInfo: user,
            receiverInfo: receiver,
            histories: [],
          };
        }
      }
      const shipmentId = await addShipment(data);

      methods.reset();
      toast.success("Successfully added package");
      sendEmail({
        action: "shipment registered",
        userEmail: data.extras?.receiverInfo.email || "",
        accessKey: defaultAccess,
        product: data.product,
        destination: data.destination,
        arrivalDate: data.deliveryDate,
        shipperName: data.shipperName,
        userName: data.extras?.receiverInfo.name || "",
      });
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
          options={users}
          optionsDisplayKeys={["name", "email"]}
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

        {user && (
          <Input
            label="Courier"
            placeholder="Select Courier"
            type="options"
            options={[user, ...users]}
            optionsDisplayKeys={["name", "email"]}
            name="courier"
            required
          />
        )}

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
          max={100}
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
        <Input
          label="Image"
          placeholder="image"
          type="file"
          name="extras.imageToUpload"
        />

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
