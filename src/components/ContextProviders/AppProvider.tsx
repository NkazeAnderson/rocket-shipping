"use client";
import {
  appContextT,
  notificationT,
  RealTimeSubscriptionCallbackPayload,
  withId,
} from "@/types/types";
import {
  addShipment,
  getConversations,
  getMyInfo,
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
import { conversationT, shipmentT, userT } from "@/types/schemas";
import useShipments from "../../../hooks/useShipments";
export const AppContext = createContext<appContextT | undefined>(undefined);

function AppProvider({ children }: { children: React.ReactNode }) {
  const shipmentsMethods = useShipments();
  const userMethods = useUser();
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<withId<notificationT>[]>(
    []
  );
  const [conversations, setConversations] = useState<conversationT[]>([]);

  const router = useRouter();
  const path = usePathname();
  const { user, users, addNewUser, editUser } = userMethods;
  const { shipments, addNewShipment, addNewShipments, editShipment } =
    shipmentsMethods;

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
      console.log("Unsubscribing");

      subscribed && unsubscribe();
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
      getConversations(user.$id)
        .then((res) => {
          setConversations(res);
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
        conversations,
        setConversations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
