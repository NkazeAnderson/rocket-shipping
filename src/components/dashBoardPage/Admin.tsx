import React from "react";
import SectionTitle from "../SectionTitle";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { BiCheck } from "react-icons/bi";

function Admin() {
  return (
    <div className="w-full">
      <div className="rounded-30 bg-black text-white p-16 w-full ">
        <h2 className="text-center">Admin</h2>
      </div>
      <div className="w-full p-16">
        <div className="w-full">
          <div className="mx-auto w-fit p-8 flex justify-between space-x-24 rounded-30 bg-dark-gray">
            <span className=" px-16 py-8 bg-primary rounded-30 text-white font-bold capitalize hover:cursor-pointer">
              Add
            </span>
            <span className=" px-16 py-8 bg-dark-gray rounded-30 text-primary font-bold capitalize hover:cursor-pointer">
              edit
            </span>
          </div>
        </div>
        <div className=" w-full ">
          <div className="mb-8">
            <Input
              label="Search"
              placeholder="Search for a user by name or email"
              type="search"
            />
          </div>
          <div className="flex items-center py-[2] border-y-dark-gray border-y hover:cursor-pointer">
            <div className="flex-grow">
              <span className=" text-12">John Doe - johndoe@gmail.com</span>
            </div>
            <div className="p-8">
              <BiCheck size={25} className="text-success" />
            </div>
          </div>
        </div>
        <SectionTitle text="Add User" />

        <form className=" space-y-8" action="">
          <Input label="Name" placeholder="John Doe" type="text" />
          <Input label="Email" placeholder="johndoe@gmail.com" type="email" />
          <Input label="Phone" placeholder="413 265 2766" type="text" />
          <Input label="Password" placeholder="password" type="text" />
          <Input label="Picture" placeholder="Profile Pic" type="file" />
          <div className="w-full flex justify-center">
            <Button props={{ text: "Add" }} />
          </div>
        </form>
        <span className="p-40"></span>
        <hr />
        <span className="p-40"></span>
        <SectionTitle text="Add Package" />
        <form className="space-y-8" action="">
          <Input label="ShipperName" placeholder="John Doe" type="text" />
          <Input label="ShipperEmail" placeholder="John Doe" type="email" />
          <Input
            label="OriginStreet"
            placeholder="123 binton Ave E"
            type="text"
          />
          <Input label="Origin" placeholder="New York, NY, USA" type="text" />
          <Input
            label="CurrentStreet"
            placeholder="123 binton Ave E"
            type="text"
          />
          <Input label="Location" placeholder="New York, NY, USA" type="text" />
          <Input
            label="Receiver"
            placeholder="Select Receiver"
            type="options"
            options={[
              "John Doe - johnDoe@gmail.com",
              "MaryJane - maryjane@gmail.com",
            ]}
          />
          <Input
            label="DestinationStreet"
            placeholder="123 seashore w"
            type="text"
          />
          <Input label="Destination" placeholder="Miami, FL, USA" type="text" />
          <Input label="Package" placeholder="Crate" type="text" />
          <Input label="PickUpDate" placeholder="Date" type="date" />
          <Input label="DeliveryDate" placeholder="Date" type="date" />
          <Input
            label="ETA"
            placeholder="Expected Time of Arrival"
            type="time"
          />
          <Input label="Product" placeholder="Car" type="text" />
          <Input
            label="Shipment Mode"
            placeholder="Select Mode"
            type="options"
            options={["Air Freight", "Sea Freight", "Land Freight"]}
          />
          <Input label="Image" placeholder="image" type="file" />
          <Input
            label="Quantity"
            placeholder="1"
            type="number"
            min={1}
            max={10}
          />
          <Input
            label="progress"
            placeholder="progress"
            type="range"
            min={0}
            max={100}
          />
          <Input
            label="Status"
            placeholder="Picked Up"
            type="options"
            options={[
              "Picked",
              "Out for Delivery",
              "In Transit",
              "On Hold",
              "Delivered",
            ]}
          />
          <Input
            label="Action"
            placeholder="Action to be taken"
            type="options"
            options={["None", "Make Payments", "Clear Insurance"]}
          />
          <div className="w-full flex justify-center">
            <Button props={{ text: "Add" }} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;
