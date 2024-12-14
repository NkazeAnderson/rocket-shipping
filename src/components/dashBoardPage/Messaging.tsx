"use client";
import Image from "next/image";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import MessageCard from "./MessageCard";
import { FaCamera, FaPaperPlane } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Context } from "./DashBoardWrapper";
import { appContextT, dashBoardContextT } from "@/types/types";
import { AppContext } from "../ContextProviders/AppProvider";
import {
  addConversation,
  addNewFile,
  addNotification,
  getUserById,
  sendMessage,
  storage,
  UpdateUser,
} from "@/utils/appwrite";
import toast from "react-hot-toast";
import { messageT, notificationT, userT } from "@/types/schemas";

function Messaging() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [image, setImage] = useState<null | File>(null);
  const [otherMember, setOtherMember] = useState<undefined | userT>(undefined);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const {
    userMethods: { user },
    conversationsMethods: { conversations },
  } = useContext(AppContext) as appContextT;
  const { sidePanelContent } = useContext(Context) as dashBoardContextT;

  const lastElement = useRef<null | HTMLDivElement>(null);
  const clearNewMessages = () => {
    setMessage("");
    setImage(null);
  };

  let conversation = conversations.find(
    (item) => item.$id === sidePanelContent?.id
  );

  useEffect(() => {
    if (!user || !conversation?.extras) {
      sidePanelContent &&
        getUserById(sidePanelContent.id).then((user) => {
          setOtherMember(user);
        });
      return;
    }
    if (user.$id === conversation.member1) {
      setOtherMember(conversation.extras.member2Info);
      return;
    } else {
      setOtherMember(conversation.extras.member1Info);
      return;
    }
  }, [conversation]);

  useEffect(() => {
    if (image) {
      const blob = URL.createObjectURL(image);
    }
  }, [image]);
  useEffect(() => {
    setTimeout(() => {
      lastElement.current && lastElement.current.scrollIntoView(false);
    }, 1000);
  }, [sidePanelContent?.id, conversations]);
  async function submit() {
    setPending(true);
    try {
      const startNewConverstions = !conversation;
      if (
        !conversation &&
        user &&
        sidePanelContent &&
        sidePanelContent.subject === "conversation"
      ) {
        conversation = {
          member1: sidePanelContent.id,
          member2: user.$id,
          $id: "",
        };
        const chatId = await addConversation(conversation);
        const notification: notificationT = {
          $id: "",
          heading: "You have a new chat",
          description: "You have a new message from " + user.name,
          appEntity: "conversation",
          appEntityId: chatId,
        };
        const notificationId = await addNotification(notification);
        if (
          user.conversations &&
          user.notifications &&
          otherMember?.conversations &&
          otherMember?.notifications
        ) {
          otherMember.conversations.push(chatId);
          user.conversations.push(chatId);
          otherMember.notifications.push(notificationId);
        }
        conversation.$id = chatId;
      }

      if (!user || !conversation) {
        throw new Error("User and Conversation required");
      }

      const messageToSend: messageT = {
        $id: "",
        conversationId: conversation.$id,
        timeStamp: new Date().getTime(),
        sender: user.$id,
      };

      if (message) {
        messageToSend.text = message;
      }
      if (image) {
        const id = await addNewFile(image);
        messageToSend.image = id;
      }
      console.log(messageToSend);

      await sendMessage(messageToSend);
      startNewConverstions && UpdateUser(user);
      startNewConverstions && otherMember && UpdateUser(otherMember);
      setPending(false);
    } catch (error) {
      console.log(error);

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
              otherMember?.extras?.imageUrl
                ? otherMember.extras.imageUrl
                : "/no-pic.jpg"
            }
            alt=""
          />
          <div>
            <h5 className="font-bold">{otherMember?.name || "User"}</h5>
            <p>Online</p>
          </div>
        </div>
      </div>
      <div className=" w-full p-16 overflow-y-auto">
        {conversation?.extras?.messages.map((item) => (
          <MessageCard key={item.$id} message={item} />
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
          <div className={pending ? `animate-ping` : ""}>
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
    </div>
  );
}

export default Messaging;
