"use client";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import MessageCard from "./MessageCard";
import { FaCamera, FaPaperPlane } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Context } from "./DashBoardWrapper";
import {
  appContextT,
  conversationT,
  conversationWithMessageT,
  dashBoardContextT,
  messageT,
} from "@/types/types";
import { AppContext } from "../ContextProviders/AppProvider";
import { sendMessage, storage } from "@/utils/appwrite";
import { bucket } from "@/utils/contants";
import { ID } from "appwrite";
import toast from "react-hot-toast";

function Messaging() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [image, setImage] = useState<null | File>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { conversations, user } = useContext(AppContext) as appContextT;
  const { sidePanelContent } = useContext(Context) as dashBoardContextT;
  const lastElement = useRef<null | HTMLDivElement>(null);
  const clearNewMessages = () => {
    setMessage("");
    setImage(null);
  };

  const conversation = conversations.find(
    (item) => item.$id === sidePanelContent?.id
  ) as conversationWithMessageT;
  useEffect(() => {
    if (image) {
      const blob = URL.createObjectURL(image);
      console.log(blob);
    }
  }, [image]);
  useEffect(() => {
    setTimeout(() => {
      lastElement.current && lastElement.current.scrollIntoView(false);
    }, 1000);
  }, [sidePanelContent?.id, conversations]);
  if (
    !conversation ||
    typeof conversation.member1 === "string" ||
    typeof conversation.member2 === "string"
  ) {
    return null;
  }
  async function submit() {
    try {
      setPending(true);
      const imageID = ID.unique();

      if (image) {
        await storage.createFile(bucket, imageID, image);
      }
      const messageToSend: messageT | undefined =
        message && user
          ? {
              conversationId: conversation.$id,
              sender: user.$id,
              text: message,
              timeStamp: new Date().getTime(),
            }
          : image && user
          ? {
              conversationId: conversation.$id,
              sender: user.$id,
              image: imageID,
              timeStamp: new Date().getTime(),
            }
          : undefined;
      messageToSend && (await sendMessage(messageToSend));
      setPending(false);
    } catch (error) {
      setPending(false);
      toast.error("Error sending message");
    }
  }
  return (
    <div className=" w-full flex-1 relative">
      <div className="flex justify-between sticky top-0 items-center bg-black p-8 rounded-b-15 text-white">
        <div className="flex space-x-8">
          <Image
            width={60}
            height={60}
            style={{ objectFit: "cover" }}
            className="rounded-full"
            src={
              conversation.member1.$id === user?.$id &&
              conversation.member2.image
                ? conversation.member2.image
                : conversation.member2.$id === user?.$id &&
                  conversation.member1.image
                ? conversation.member1.image
                : "/no-pic.jpg"
            }
            alt=""
          />
          <div>
            <h5 className="font-bold">{conversation.member2.name}</h5>
            <p>Online</p>
          </div>
        </div>
      </div>
      <div className=" w-full p-16 overflow-y-auto">
        {conversation.messages.map((item) => (
          <MessageCard key={item.$id} props={item} />
        ))}
      </div>
      <div ref={lastElement} className=" pb-96"></div>
      <div className="w-full border-2 border-success fixed bottom-0 rounded-tl-30">
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
                !pending &&
                  submit().then(() => {
                    clearNewMessages();
                  });
              }}
            >
              <FaPaperPlane
                className={`text-success rotate-12 ${
                  pending && "animate-pulse"
                }`}
                size={25}
              />
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
                !pending &&
                  submit().then(() => {
                    clearNewMessages();
                  });
              }}
            >
              <FaPaperPlane
                className={`text-success rotate-12 ${
                  pending && "animate-pulse"
                }`}
                size={25}
              />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messaging;
