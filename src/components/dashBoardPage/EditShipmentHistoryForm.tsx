import { shipmentHistoryT } from "@/types/types";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<shipmentHistoryT>();
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
      reset();
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
    reset(data);
  }, [history]);

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
        label="Current Zip"
        placeholder="10254"
        type="options"
        options={status}
        name={"status"}
        register={register}
      />

      <div className="w-full flex justify-center">
        <Button props={{ text: "Edit History", pending: isSubmitting }} />
      </div>
    </form>
  );
}

export default EditShipmentHistoryForm;
