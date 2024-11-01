import { shipmentHistoryT } from "@/types/types";
import React, { useEffect } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";
import Input from "../ui/Input";
import toast from "react-hot-toast";
import { database, shipmentHistoryCollection, status } from "@/utils/contants";
import { db } from "@/utils/appwrite";

function EditShipmentHistoryForm({
  history,
  hide,
}: {
  history: shipmentHistoryT & { $id: string };
  hide: () => void;
}) {
  const methods = useForm<shipmentHistoryT>();
  const onSubmit: SubmitHandler<shipmentHistoryT> = async (data) => {
    try {
      let imageId = "";
      data.status = status[Number(data.status)];

      //@ts-ignore
      data.$collectionId && delete data.$collectionId;
      //@ts-ignore
      data.$createdAt && delete data.$createdAt;
      //@ts-ignore
      data.$databaseId && delete data.$databaseId;
      //@ts-ignore
      data.$permissions && delete data.$permissions;
      //@ts-ignore
      data.$updatedAt && delete data.$updatedAt;
      //@ts-ignore
      data.$id && delete data.$id;

      await db.updateDocument(
        database,
        shipmentHistoryCollection,
        history.$id,
        data
      );
      methods.reset();
      toast.success("Successfully editted shipment");
      hide();
    } catch (error) {
      console.log(error);
      toast.error("Error editing shipment");
    }
  };

  useEffect(() => {
    if (typeof history.status === "number") {
      return;
    }
    const data = { ...history };
    //@ts-ignore
    data.status = status.findIndex((item) => item === data.status);
    methods.reset(data);
  }, [history]);

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
