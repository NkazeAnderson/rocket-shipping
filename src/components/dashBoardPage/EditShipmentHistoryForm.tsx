import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import toast from "react-hot-toast";
import { database, shipmentHistoryCollection, status } from "@/utils/contants";
import { db, updateShipmentHistory } from "@/utils/appwrite";
import { getLatLong } from "@/utils";
import { shipmentHistoryT } from "@/types/schemas";

function EditShipmentHistoryForm({
  history,
  hide,
}: {
  history: shipmentHistoryT;
  hide: () => void;
}) {
  const methods = useForm<shipmentHistoryT>({defaultValues: history});
  const onSubmit: SubmitHandler<shipmentHistoryT> = async (data) => {
    try {
      await updateShipmentHistory(data, history)
      methods.reset();
      toast.success("Successfully editted shipment");
      hide();
    } catch (error) {
      console.log(error);
      toast.error("Error editing shipment");
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
        <Input
          label="Status"
          placeholder="Status"
          type="options"
          options={status}
          name={"status"}
        />

        <div className="w-full flex justify-center">
          <Button
            props={{
              text: "Edit History",
              pending: methods.formState.isSubmitting,
            }}
          />
        </div>
      </form>
    </FormProvider>
  );
}

export default EditShipmentHistoryForm;
