import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import {
  actions,
  modes,
  packages,
  paymentModes,
} from "@/utils/contants";
import {
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { updateShipment } from "@/utils/appwrite";
import EditShipmentHistoryForm from "./EditShipmentHistoryForm";
import AddShipmentHistoryForm from "./AddShipmentHistoryForm";
import { shipmentT, userT } from "@/types/schemas";
import useUser from "../../../hooks/useUser";
import { AppContext } from "../ContextProviders/AppProvider";
import { appContextT } from "@/types/types";

function EditPackageForm({
  selectedIndex,
}: {
  selectedIndex: number;
}) {
  const {users}= useUser()
  const {shipments} = useContext(AppContext) as appContextT
  const shipment = shipments[selectedIndex]
  shipment.pickupDate = shipment.pickupDate.split("T")[0];
  shipment.deliveryDate = shipment.deliveryDate.split("T")[0];

  const methods = useForm<shipmentT>({defaultValues:shipment});
  const shipmentHistoryList = shipment.extras?.histories;
  const [editHistory, setEditHistory] = useState<undefined | number>();
  const [addHistory, setAddHistory] = useState<boolean>(false);

  const onSubmit: SubmitHandler<shipmentT> = async (data) => {
    try {
      await updateShipment(data, shipment);
      methods.reset();
      toast.success("Successfully editted shipment");
    } catch (error) {
      console.log(error);
      toast.error("Error editing shipment");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="space-y-8"
          action=""
          key={selectedIndex}
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
            placeholder="123 binton Ave E"
            type="text"
            name="origin"
            required
            location
          />

          <Input
            label="Receiver"
            placeholder="Select Receiver"
            type="options"
            options={users}
            name="receiver"
            optionsDisplayKeys={["name", "email"]}
            defaultValue={shipment.receiver}
            required
          />
          <Input
            label="Destination"
            placeholder="123 seashore w"
            type="text"
            name="destination"
            location
            required
          />

          <Input
            label="Courier"
            placeholder="Select Receiver"
            type="options"
            options={users}
            optionsDisplayKeys={["name", "email"]}
            defaultValue={shipment.courier}
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
            max={1000}
            name="weight"
            required
          />
          <Input
            label="Update required action"
            placeholder="Insurance"
            type="options"
            options={actions}
            name="action"
          />
          <Input label="Image" placeholder="image" type="file" name="extra.imageToUpload" />

          <div className="w-full flex justify-center">
            <Button
              props={{ text: "Edit", pending: methods.formState.isSubmitting }}
            />
          </div>
        </form>
      </FormProvider>
      <div className="mt-24"></div>
      <h3 className="py-16">Shipment History</h3>
      <div className="flex flex-row items-center justify-center my-32">
        <button
          onClick={() => {
            setAddHistory((prev) => !prev);
          }}
          className="py-8 px-16 border border-success text-success rounded-30"
        >
          {addHistory ? "Cancel addition" : "Add New History"}
        </button>
      </div>
      {addHistory && (
        <div className="py-8">
          <AddShipmentHistoryForm
            shipmentId={shipment.$id}
            hide={() => {
              setAddHistory(false);
            }}
          />
        </div>
      )}

      <table className=" w-full " style={{ overflowX: "scroll" }}>
        <tr>
          <th>Edit</th>
          <th>Location</th>
          <th>Status</th>
          <th>date</th>
        </tr>
      </table>
      {shipmentHistoryList?.map((history, index) => (
        <>
          <div className="flex flex-row overflow-x-auto items-center justify-around">
            <div
              onClick={() => {
                console.log("editHistory");
                setEditHistory(index);
              }}
              className="p-4  rounded bg-secondary text-primary underline text-center hover:cursor-pointer"
            >
              Edit history
            </div>
            <div className=" text-center">{`${history.currentLocation}`}</div>
            <div className=" text-center">{`${history.status}`}</div>
            <div className=" text-center">
              {" "}
              {`${history.date.split("T")[0]}`}
            </div>
          </div>
          {typeof editHistory !== "undefined" &&
            editHistory === index &&
            shipmentHistoryList?.length && (
              <>
                <div className="flex flex-row justify-between items-center py-16">
                  <h4>Edit</h4>
                  <p
                    onClick={() => {
                      setEditHistory(undefined);
                    }}
                    className=" text-danger "
                  >
                    x
                  </p>
                </div>
                <EditShipmentHistoryForm
                  history={shipmentHistoryList[editHistory]}
                  hide={() => {
                    setEditHistory(undefined);
                  }}
                />
              </>
            )}
        </>
      ))}
    </>
  );
}

export default EditPackageForm;
