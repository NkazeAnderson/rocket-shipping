import { conversationT, messageT } from "@/types/schemas";
import { useState } from "react";

export default function useConversations(){
    const [conversations, setConversations] = useState<conversationT[]>([]);

    function addNewConversation(conversation:conversationT) {
        setConversations(prev=>[conversation, ...prev])
    }
    function addNewconversations(conversation:conversationT[]) {
        setConversations(prev=>[...conversation, ...prev])
    }
    function addNewMessage(message:messageT){
        console.log("New message");
        console.log(message);
        
        setConversations(prev=>prev.map(conversation=>{
            if (conversation.$id === message.conversationId) {
              const extras =  conversation.extras
              console.log({extras});
              
              if (extras) {
                conversation.extras?.messages.push(message)
            }
        }
        return conversation
        }))
    }
    return { conversations, addNewConversation, addNewconversations, addNewMessage}
}

export type useConversationsT = ReturnType<typeof useConversations>