import React from "react";
import ConversationCard from "./ConversationCard";

function Messages() {
  return (
    <>
      <h2 className="dashboardHeadings">Messages</h2>
      <div className="py-24">
        <ConversationCard props={{ id: "Con09828" }} />
      </div>
    </>
  );
}

export default Messages;
