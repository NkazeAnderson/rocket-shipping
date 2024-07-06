import React from "react";
import ConversationCard from "./ConversationCard";
import { conversations } from "@/utils/contants";

function Conversations() {
  return (
    <>
      <h2 className="dashboardHeadings">Conversations</h2>
      <div className="py-24">
        {conversations.map((item) => (
          <ConversationCard key={item.id} props={item} />
        ))}
      </div>
    </>
  );
}

export default Conversations;
