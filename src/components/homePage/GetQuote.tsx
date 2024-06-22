import React from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";

function GetQuote() {
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
          />
          <Input
            placeholder="123 SunSet City, Miami, FL, 20237"
            label="Destination"
            type="text"
          />
          <div className="flex">
            <div className="w-[50%] pr-8">
              <Input type="text" label="weight" placeholder="24" />
            </div>
            <div className="w-[50%] pr-8">
              <Input type="text" label="units" placeholder="1" />
            </div>
          </div>
          <div className="w-[50%] pr-8">
            <Input type="text" label="weight" placeholder="No" />
          </div>
          <div className="w-[50%] pr-8">
            <Input type="text" label="weight" placeholder="No" />
          </div>
          <Button props={{ text: "Submit" }} />
        </form>
      </div>
    </div>
  );
}

export default GetQuote;
