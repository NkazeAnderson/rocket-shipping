import React from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import {
  modes,
  packages,
  paymentModes,
  shipmentFormGroup,
} from "@/utils/contants";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { packageT, shipmentT, userT } from "@/types/types";

function AddPackageForm() {
  const group = shipmentFormGroup;
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const shipmentInfo = data as shipmentT;
    alert(JSON.stringify(data));
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
        group={group}
      />
      <Input
        label="Shipper's Email"
        placeholder="Johndoe@gmail.com"
        type="email"
        name="shipperEmail"
        register={register}
        required
        group={group}
      />
      <Input
        label="Origin Street"
        placeholder="123 binton Ave E"
        type="text"
        name="originStreet"
        register={register}
        required
        group={group}
      />
      <Input
        label="Origin City, State, Country"
        placeholder="New York, NY, USA"
        type="text"
        name="origin"
        register={register}
        required
        group={group}
      />
      <Input
        label="Origin Zip"
        placeholder="07261"
        type="text"
        name="originZip"
        register={register}
        required
        group={group}
      />

      <Input
        label="Receiver"
        placeholder="Select Receiver"
        type="options"
        options={[
          "John Doe - johnDoe@gmail.com",
          "MaryJane - maryjane@gmail.com",
        ]}
        name="receiver"
        register={register}
        required
        group={group}
      />
      <Input
        label="Destination Street"
        placeholder="123 seashore w"
        type="text"
        name="destinationStreet"
        register={register}
        required
        group={group}
      />
      <Input
        label="Destination City, State, Country"
        placeholder="Miami, FL, USA"
        type="text"
        name="destination"
        register={register}
        required
        group={group}
      />
      <Input
        label="Destination Zip"
        placeholder="17652"
        type="text"
        name="destinationZip"
        register={register}
        required
        group={group}
      />

      <Input
        label="Courier"
        placeholder="Select Receiver"
        type="options"
        options={[
          "John Doe - johnDoe@gmail.com",
          "MaryJane - maryjane@gmail.com",
        ]}
        name="courier"
        register={register}
        required
        group={group}
      />

      <Input
        label="PickUp Date"
        placeholder="Date"
        type="date"
        name="pickUpDate"
        register={register}
        required
        group={group}
      />
      <Input
        label="Delivery Date"
        placeholder="Date"
        type="date"
        name="deliveryDate"
        register={register}
        required
        group={group}
      />
      <Input
        label="ETA"
        placeholder="Expected Time of Arrival"
        type="time"
        name="eta"
        register={register}
        required
        group={group}
      />
      <Input
        label="Product"
        placeholder="Car"
        type="text"
        name="product"
        register={register}
        required
        group={group}
      />
      <Input
        label="Package"
        placeholder="Crate"
        type="options"
        name="package"
        options={packages}
        register={register}
        required
        group={group}
      />
      <Input
        label="Shipment Mode"
        placeholder="Select Mode"
        type="options"
        options={modes}
        name="mode"
        register={register}
        required
        group={group}
      />
      <Input
        label="Payment Mode"
        placeholder="Select Mode"
        type="options"
        options={paymentModes}
        name="paymentMode"
        register={register}
        required
        group={group}
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
        group={group}
      />
      <Input
        label="Weight"
        placeholder="1"
        type="number"
        min={1}
        max={10}
        name="weight"
        register={register}
        required
        group={group}
      />
      <Input
        label="Image"
        placeholder="image"
        type="file"
        name="image"
        register={register}
        group={group}
      />

      <div className="w-full flex justify-center">
        <Button props={{ text: "Add" }} />
      </div>
    </form>
  );
}

export default AddPackageForm;
