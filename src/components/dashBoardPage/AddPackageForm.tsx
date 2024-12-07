import React from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import {
  modes,
  packages,
  paymentModes,
} from "@/utils/contants";
import {
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { addConversation, addNewFile, addShipment, addShipmentHistory, db, getConversationId, storage } from "@/utils/appwrite";
import toast from "react-hot-toast";
import { getLatLong } from "@/utils";
import { conversationT, shipmentHistoryT, shipmentSchema, shipmentT, userT } from "@/types/schemas";

function AddPackageForm({ users }: { users: userT[] }) {
  const methods = useForm<shipmentT>();
  const onSubmit: SubmitHandler<shipmentT> = async (data) => {
    try {
      data.courier = users[Number(data.courier)].$id;
      data.receiver = users[Number(data.receiver)].$id;
      if (
        data.extras?.imageToUpload?.length
      ) {
       const imageId = await addNewFile(data.extras.imageToUpload[0])
        data.image = imageId;
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
  
      // let conversationId = await getConversationId(
      //   data.courier,
      //   data.receiver
      // );
      // if (!conversationId) {
      //   const conversation: conversationT = {
      //     member1: data.courier,
      //     member2: data.receiver,
      //   };
      //  conversationId = await addConversation(conversation)
      // }
      // data.conversationId = conversationId;
     
      await addShipment(data)
      
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
          max={10000}
          name="weight"
          required
        />
        <Input label="Image" placeholder="image" type="file" name="extras.imageToUpload" />

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
