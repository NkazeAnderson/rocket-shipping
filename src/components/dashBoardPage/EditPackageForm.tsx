import React from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { formRegisterT, shipmentT } from "@/types/types";
import {
  modes,
  packages,
  paymentModes,
  shipmentFormGroup,
  status,
  users,
} from "@/utils/contants";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

function EditPackageForm({ shipment }: { shipment: shipmentT }) {
  const { register, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const shipmentInfo = data as shipmentT;
    alert(JSON.stringify(data));
  };
  const group = shipmentFormGroup;
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" action="">
      <Input
        label="Shipper's Name"
        placeholder="John Doe"
        type="text"
        name="shipperName"
        defaultValue={shipment.sender.name}
        register={register}
        group={group}
      />
      <Input
        label="Shipper's Email"
        placeholder="Johndoe@gmail.com"
        type="email"
        name="shipperEmail"
        defaultValue={shipment.sender.email}
        register={register}
        required
        group={group}
      />
      <Input
        label="Origin Street"
        placeholder="123 binton Ave E"
        type="text"
        name="originStreet"
        defaultValue={shipment.origin.street}
        register={register}
        required
        group={group}
      />
      <Input
        label="Origin City, State, Country"
        placeholder="New York, NY, USA"
        type="text"
        name="origin"
        defaultValue={shipment.origin.cityStateCountry}
        register={register}
        required
        group={group}
      />
      <Input
        label="Origin Zip"
        placeholder="07261"
        type="text"
        name="originZip"
        defaultValue={shipment.origin.zip}
        register={register}
        required
        group={group}
      />

      <Input
        label="Receiver"
        placeholder="Select Receiver"
        type="options"
        options={users.map((item) => `${item.name} - ${item.email}`)}
        defaultValue={users.findIndex(
          (item) => item.email === shipment.receiver.email
        )}
        name="receiver"
        register={register}
        required
        group={group}
      />
      <Input
        label="Current Street"
        placeholder="123 seashore w"
        type="text"
        name="currentStreet"
        defaultValue={shipment.currentLocation.street}
        register={register}
        required
        group={group}
      />
      <Input
        label="current City, State, Country"
        placeholder="Miami, FL, USA"
        type="text"
        name="current"
        defaultValue={shipment.currentLocation.cityStateCountry}
        register={register}
        required
        group={group}
      />
      <Input
        label="Current Zip"
        placeholder="17652"
        type="text"
        name="currentZip"
        defaultValue={shipment.currentLocation.zip}
        register={register}
        required
        group={group}
      />
      <Input
        label="Destination Street"
        placeholder="123 seashore w"
        type="text"
        name="destinationStreet"
        defaultValue={shipment.destination.street}
        register={register}
        required
        group={group}
      />
      <Input
        label="Destination City, State, Country"
        placeholder="Miami, FL, USA"
        type="text"
        name="destination"
        defaultValue={shipment.destination.cityStateCountry}
        register={register}
        required
        group={group}
      />
      <Input
        label="Destination Zip"
        placeholder="17652"
        type="text"
        name="destinationZip"
        defaultValue={shipment.destination.zip}
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
        defaultValue={shipment.product}
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
        defaultValue={packages.findIndex((item) => item === shipment.package)}
        register={register}
        required
        group={group}
      />
      <Input
        label="Shipment Mode"
        placeholder="Select Mode"
        type="options"
        options={modes}
        defaultValue={modes.findIndex((item) => item === shipment.mode)}
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
        defaultValue={paymentModes.findIndex(
          (item) => item === shipment.paymentMethod
        )}
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
        defaultValue={shipment.quantity}
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
        defaultValue={shipment.weight}
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
        disabled
        group={group}
      />
      <Input
        label="Status"
        placeholder="Status"
        type="options"
        options={status}
        defaultValue={0}
        name="weight"
        register={register}
        required
        group={group}
      />
      <Input
        label="Action"
        placeholder="Action"
        type="text"
        name="action"
        register={register}
        required
        group={group}
      />

      <div className="w-full flex justify-center">
        <Button props={{ text: "Edit" }} />
      </div>
    </form>
  );
}

export default EditPackageForm;
