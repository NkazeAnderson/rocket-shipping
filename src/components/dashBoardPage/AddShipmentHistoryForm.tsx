import { shipmentHistoryT } from "@/types/types";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<shipmentHistoryT>();
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
      reset();
      toast.success("Successfully added history shipment");
      hide();
    } catch (error) {
      console.log(error);
      toast.error("Error adding shipment shistory");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" space-y-8">
      <Input
        label="Current Street"
        placeholder="123 street"
        type="text"
        name={"currentStreet"}
        register={register}
      />
      <Input
        label="Current City, State, Country"
        placeholder="New York, NY, USA"
        type="text"
        name={"currentCityStateCountry"}
        register={register}
      />
      <Input
        label="Current Zip"
        placeholder="10254"
        type="text"
        name={"currentZip"}
        register={register}
      />
      <Input
        label="Date"
        placeholder="Date"
        type="date"
        name={"date"}
        register={register}
      />
      <Input
        label="Current Zip"
        placeholder="10254"
        type="options"
        options={status}
        name={"status"}
        register={register}
      />

      <div className="w-full flex justify-center">
        <Button props={{ text: "Add History", pending: isSubmitting }} />
      </div>
    </form>
  );
}

export default AddShipmentHistoryForm;
