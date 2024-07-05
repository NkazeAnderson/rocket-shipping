"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";
import { FaCamera, FaPaperPlane } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function Messaging() {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<null | File>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const clearNewMessages = () => {
    setMessage("");
    setImage(null);
  };
  useEffect(() => {
    if (image) {
      const blob = URL.createObjectURL(image);
      console.log(blob);
    }
  }, [image]);
  return (
    <div className=" w-full">
      <div className="flex justify-between sticky top-0 items-center bg-black p-8 rounded-b-15 text-white">
        <div className="flex space-x-8">
          <Image
            width={60}
            height={60}
            style={{ objectFit: "cover" }}
            className="rounded-full"
            src="/courier.png"
            alt=""
          />
          <div>
            <h5 className="font-bold">Anthony miller</h5>
            <p>Online</p>
          </div>
        </div>
      </div>
      <div className=" w-full p-16">
        <MessageCard
          isSender={false}
          read={true}
          text="Storage costs are in GiB/month and calculated daily. Firestore measures the database size daily. Over the period of a month, these sample points are averaged to calculate the database storage size. This average value is multiplied by the unit price of storage (GiB-month)"
        />
        <MessageCard
          isSender={true}
          read={false}
          text="Storage costs are in GiB/month and calculated daily. "
        />
        <MessageCard
          isSender={true}
          read={false}
          text="Storage costs are in GiB/month and calculated daily. "
        />
        <MessageCard
          isSender={true}
          read={false}
          text="Storage costs are in GiB/month and calculated daily. "
        />
        <MessageCard
          isSender={true}
          read={false}
          text="Storage costs are in GiB/month and calculated daily. "
          image="/image-placeholder.jpg"
        />
      </div>
      <div className="w-full border-2 border-success sticky bottom-0 rounded-tl-30">
        <div className="flex items-center bg-light-gray px-16 py-8 rounded-tl-30">
          <div className="flex-grow">
            {image ? (
              <div className="p-16 bg-primary/20 relative">
                <span
                  className="p-16 absolute top-16 right-40 rounded-full border-2 border-danger hover:cursor-pointer"
                  onClick={() => {
                    setImage(null);
                  }}
                >
                  <FaXmark className="text-danger" size={18} />
                </span>
                <Image
                  src={URL.createObjectURL(image)}
                  className=" object-contain"
                  width={200}
                  height={200}
                  alt="image to be uploaded"
                />
              </div>
            ) : (
              <textarea
                name="message"
                id="message"
                className={`w-full outline-none focus:outline-none`}
                rows={2}
                placeholder="Type your message here... "
                value={message}
                onChange={(e) => {
                  setMessage(e.currentTarget.value);
                }}
              />
            )}

            <input
              ref={imageRef}
              type="file"
              accept=".png, .jpeg, .jpg"
              className=" hidden"
              onChange={(e) => {
                setImage(
                  e.currentTarget.files ? e.currentTarget.files[0] : null
                );
              }}
            />
          </div>

          {message ? (
            <span
              className="p-24 hover:cursor-pointer"
              onClick={() => {
                clearNewMessages();
              }}
            >
              <FaPaperPlane className="text-success rotate-12 " size={25} />
            </span>
          ) : !image ? (
            <span
              className="p-24 hover:cursor-pointer"
              onClick={() => {
                imageRef.current && imageRef.current.click();
              }}
            >
              <FaCamera className="text-success " size={25} />
            </span>
          ) : (
            <span
              className="p-24 hover:cursor-pointer"
              onClick={() => {
                clearNewMessages();
              }}
            >
              <FaPaperPlane className="text-success rotate-12 " size={25} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messaging;
