import React from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { formRegisterT } from "@/types/types";
import { modes, packages, paymentModes } from "@/utils/contants";

function AddPackageForm({ register }: { register: formRegisterT }) {
  return (
    <form className="space-y-8" action="">
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
        name="origin"
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
        options={[
          "John Doe - johnDoe@gmail.com",
          "MaryJane - maryjane@gmail.com",
        ]}
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
        name="destination"
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
        label="PickUp Date"
        placeholder="Date"
        type="date"
        name="pickUpDate"
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
        label="Payment Mode"
        placeholder="Select Mode"
        type="options"
        options={paymentModes}
        name="paymentMode"
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
        label="Weight"
        placeholder="1"
        type="number"
        min={1}
        max={10}
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
        <Button props={{ text: "Add" }} />
      </div>
    </form>
  );
}

export default AddPackageForm;
