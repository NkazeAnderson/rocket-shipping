"use client";
import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useForm } from "react-hook-form";

function GetQuote() {
  const { register } = useForm();
  return (
    <div className=" md:flex px-16 md:px-48 text-white bg-success">
      <div className="md:w-[50%] p-24">
        <h2>REQUEST A QUOTE</h2>
        <p>
          Get a quote of how much it will cost to have a product shipped from
          one location to another using our price calculator
        </p>
      </div>
      <div className="md:w-[50%] p-24">
        <h2>Price Calculator</h2>
        <form className="space-y-16" action="">
          <Input
            placeholder="123 Kings Drive, nashville, TN, 30283"
            label="Origin"
            type="text"
            name="origin"
            register={register}
          />
          <Input
            placeholder="123 SunSet City, Miami, FL, 20237"
            label="Destination"
            type="text"
            name="destination"
            register={register}
          />
          <div className="flex">
            <div className="w-[50%] pr-8">
              <Input
                type="number"
                label="weight"
                placeholder="24"
                name="weight"
                register={register}
              />
            </div>
            <div className="w-[50%] pr-8">
              <Input
                type="text"
                label="Quantity"
                placeholder="1"
                name="quantity"
                register={register}
              />
            </div>
          </div>
          <div className="w-[50%] pr-8">
            <Input
              type="options"
              label="Is live Pet?"
              placeholder="No"
              options={["Yes", "No"]}
              name="LivePet"
              register={register}
            />
          </div>

          <Button props={{ text: "Submit" }} />
        </form>
      </div>
    </div>
  );
}

export default GetQuote;
