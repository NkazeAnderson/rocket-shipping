"use client";
import {
  appContextT,
  RealTimeSubscriptionCallbackPayload,
  withId,
} from "@/types/types";
import {
  getConversations,
  getMyInfo,
  getNotifications,
  getShipments,
  getUsers,
  subscribeToAdmin,
  subscribeToUser,
} from "@/utils/appwrite";
import {
  conversationCollection,
  shipmentCollection,
  shipmentHistoryCollection,
  userCollection,
} from "@/utils/contants";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useCallback, useEffect, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import useUser from "../../../hooks/useUser";
import {
  conversationT,
  notificationT,
  shipmentT,
  userT,
} from "@/types/schemas";
import useShipments from "../../../hooks/useShipments";
import useConversations from "../../../hooks/useConversations";
export const AppContext = createContext<appContextT | undefined>(undefined);

function AppProvider({ children }: { children: React.ReactNode }) {
  const shipmentsMethods = useShipments();
  const userMethods = useUser();
  const conversationsMethods = useConversations();
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<notificationT[]>([]);

  // const router = useRouter();
  // const path = usePathname();
  const { user, users, addNewUser, editUser } = userMethods;
  const {
    conversations,
    addNewConversation,
    addNewconversations,
    addNewMessage,
  } = conversationsMethods;
  const {
    shipments,
    addNewShipment,
    addNewShipments,
    editShipment,
    addShipmentHistory,
    editShipmentHistory,
  } = shipmentsMethods;

  const placeApi = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  useEffect(() => {
    placeApi.init();
  });

  const callbackSubscribtion = useCallback(function callback(
    payload: RealTimeSubscriptionCallbackPayload
  ) {
    // users
    const { target } = payload;
    const { action } = payload;
    switch (target) {
      case "user":
        switch (action) {
          case "create":
            addNewUser(payload.data);
            break;
          case "update":
            editUser(payload.data);
            break;

          default:
            break;
        }
        break;
      case "shipment":
        switch (action) {
          case "create":
            addNewShipment(payload.data);
            break;
          case "update":
            editShipment(payload.data);
            break;

          default:
            break;
        }
        break;
      case "shipmentHistory":
        switch (action) {
          case "create":
            addShipmentHistory(payload.data);
            break;
          case "update":
            editShipmentHistory(payload.data);
            break;
          default:
            break;
        }
        break;
      case "conversation":
        switch (action) {
          case "create":
            addNewConversation(payload.data);
            break;
          case "update":
            //  editShipmentHistory(payload.data);
            break;
          default:
            break;
        }
        break;
      case "message":
        switch (action) {
          case "create":
            addNewMessage(payload.data);
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  },
  []);

  useEffect(() => {
    let unsubscribe: () => void = () => {};
    if (user && shipments.length && !subscribed) {
      if (!user.isAdmin) {
        unsubscribe = subscribeToUser(
          user.$id,
          shipments,
          callbackSubscribtion
        );
      } else {
        unsubscribe = subscribeToAdmin(callbackSubscribtion);
      }
      setSubscribed(true);
    }
    return () => {
      unsubscribe();
    };
  }, [shipments]);

  useEffect(() => {
    user &&
      getShipments(user)
        .then((res) => {
          addNewShipments(res);
        })
        .catch((e) => console.log(e));
    user &&
      getConversations(user)
        .then((res) => {
          addNewconversations(res);
        })
        .catch((e) => {
          console.log(e);
        });
    user &&
      getNotifications(user)
        .then((res) => {
          setNotifications(res);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        shipmentsMethods,
        userMethods,
        notifications,
        setNotifications,
        placeApi,
        conversationsMethods,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
