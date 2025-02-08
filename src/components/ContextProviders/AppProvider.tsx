"use client";
import {
  appContextT,
  RealTimeSubscriptionCallbackPayload,
  withId,
} from "@/types/types";
import {
  getConversation,
  getConversationId,
  getConversations,
  getMyInfo,
  getNotifications,
  getShipment,
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
import React, {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const { user, users, addNewUser, editUser, editMyInfo } = userMethods;
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

  const subscribedToRealTime = useRef(false);
  const userloaded = useRef(false);

  useEffect(() => {
    placeApi.init();
  });

  const callbackSubscribtion = useCallback(
    function callback(payload: RealTimeSubscriptionCallbackPayload) {
      // users
      const { target } = payload;
      const { action } = payload;
      switch (target) {
        case "user":
          switch (action) {
            case "update":
              if (user?.shipments && payload.data.shipments?.length) {
                if (user.shipments.length !== payload.data.shipments.length) {
                  const lastShipment = payload.data.shipments[
                    payload.data.shipments.length - 1
                  ] as string;
                  getShipment(lastShipment).then((res) => {
                    addNewShipment(res);
                  });
                }
              }
              if (user?.conversations && payload.data.conversations?.length) {
                if (
                  user.conversations.length !==
                  payload.data.conversations.length
                ) {
                  const lastChat = payload.data.conversations[
                    payload.data.conversations.length - 1
                  ] as string;
                  getConversation(lastChat).then((res) => {
                    addNewConversation(res);
                  });
                }
              }
              editMyInfo(payload.data);
              break;

            default:
              break;
          }
          break;
        case "users":
          switch (action) {
            case "create":
              addNewUser(payload.data);
              break;
            case "update":
              if (payload.data.$id === user?.$id) {
                editMyInfo(payload.data);
              }
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
    [user]
  );

  useEffect(() => {
    let unsubscribe: () => void = () => {};
    let unsubscribeAdmin: () => void = () => {};
    if (user) {
      if (subscribedToRealTime.current === true) {
        unsubscribe();
        unsubscribeAdmin();
      }
      if (user.isAdmin) {
        unsubscribeAdmin = subscribeToAdmin(callbackSubscribtion);
      } else {
        unsubscribe = subscribeToUser(user, shipments, callbackSubscribtion);
      }
      subscribedToRealTime.current = true;
    }
    return () => {
      unsubscribe();
      unsubscribeAdmin();
    };
  }, [user, shipments]);

  useEffect(() => {
    user &&
      !shipments.length &&
      getShipments(user)
        .then((res) => {
          addNewShipments(res);
        })
        .catch((e) => console.log(e));
    user &&
      !conversations.length &&
      getConversations(user)
        .then((res) => {
          addNewconversations(res);
        })
        .catch((e) => {
          console.log(e);
        });
    user &&
      !notifications.length &&
      getNotifications(user)
        .then((res) => {
          setNotifications(res);
        })
        .catch((e) => {
          console.log(e);
        });
    if (user) {
      user;
    }
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
