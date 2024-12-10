"use client";
import React, { useContext } from "react";
import ConversationCard from "./ConversationCard";
import { AppContext } from "../ContextProviders/AppProvider";
import { appContextT } from "@/types/types";

function Conversations() {
  const { conversations } = useContext(AppContext) as appContextT;
  return (
    <>
      <h2 className="dashboardHeadings">Conversations</h2>
      <div className="py-24">
        {conversations.map((item) => (
          <ConversationCard key={item.$id} conversation={item} />
        ))}
      </div>
    </>
  );
}

export default Conversations;
