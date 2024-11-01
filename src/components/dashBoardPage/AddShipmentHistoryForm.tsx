import { shipmentHistoryT } from "@/types/types";
import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import toast from "react-hot-toast";
import { database, shipmentHistoryCollection, status } from "@/utils/contants";
import { db } from "@/utils/appwrite";
import { ID } from "appwrite";

function AddShipmentHistoryForm({
  shipmentId,
  hide,
}: {
  shipmentId: string;
  hide: () => void;
}) {
  const methods = useForm<shipmentHistoryT>();
  const onSubmit: SubmitHandler<shipmentHistoryT> = async (data) => {
    try {
      data.status = status[Number(data.status)];
      data.shipmentId = shipmentId;

      await db.createDocument(
        database,
        shipmentHistoryCollection,
        ID.unique(),
        data
      );
      methods.reset();
      toast.success("Successfully added history shipment");
      hide();
    } catch (error) {
      console.log(error);
      toast.error("Error adding shipment shistory");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className=" space-y-8">
        <Input
          label="Current Location"
          placeholder="123 street"
          type="text"
          name={"currentLocation"}
          location
        />

        <Input label="Date" placeholder="Date" type="date" name={"date"} />

        <div className="w-full flex justify-center">
          <Button
            props={{
              text: "Add History",
              pending: methods.formState.isSubmitting,
            }}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default AddShipmentHistoryForm;
