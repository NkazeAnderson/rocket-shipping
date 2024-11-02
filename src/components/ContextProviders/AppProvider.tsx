"use client";
import { logIn } from "@/actions";
import {
  appContextT,
  notificationT,
  shipmentHistoryT,
  shipmentWithHistoryT,
  userT,
  withId,
} from "@/types/types";
import {
  db,
  getHistory,
  getImageUrl,
  getMyInfo,
  getShipments,
  getUserById,
  getUsers,
  subscribeToAdmin,
  subscribeToUser,
} from "@/utils/appwrite";
import {
  shipmentCollection,
  shipmentHistoryCollection,
  userCollection,
} from "@/utils/contants";
import React, { createContext, useCallback, useEffect, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
export const AppContext = createContext<appContextT | undefined>(undefined);
function InitializePlaces() {}
function AppProvider({ children }: { children: React.ReactNode }) {
  const [shipments, setShipments] = useState<shipmentWithHistoryT[]>([]);
  const [user, setUser] = useState<withId<userT> | undefined>(undefined);
  const [users, setUsers] = useState<withId<userT>[]>([]);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<withId<notificationT>[]>(
    []
  );

  const placeApi = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });
  useEffect(() => {
    placeApi.init();
  });

  const callbackSubscribtion = useCallback(
    function callback(action: string, payload: Record<string, string>) {
      // users

      if (
        action === "create" &&
        "$collectionId" in payload &&
        payload.$collectionId === userCollection
      ) {
        //@ts-ignore
        const newUser = payload as withId<userT>;
        setUsers((prev) => [newUser, ...prev]);
      }
      if (
        action === "update" &&
        "$collectionId" in payload &&
        payload.$collectionId === userCollection
      ) {
        //@ts-ignore
        const newUser = payload as withId<userT>;
        setUsers((prev) =>
          prev.map((value) => {
            if (value.$id === newUser.$id) {
              return newUser;
            }
            return value;
          })
        );
      }

      // shipments;
      if (
        action === "create" &&
        "$collectionId" in payload &&
        payload.$collectionId === shipmentCollection
      ) {
        //@ts-ignore
        const newShipment = payload as withId<shipmentT>;
        setShipments((prev) => [newShipment, ...prev]);
      }
      if (
        action === "update" &&
        "$collectionId" in payload &&
        payload.$collectionId === shipmentCollection
      ) {
        //@ts-ignore
        const newShipment = payload as withId<shipmentT>;
        console.log("updated shipment");
        setShipments((prev) =>
          prev.map((value) => {
            if (value.shipment.$id === newShipment.$id) {
              value.shipment = newShipment;
              return value;
            }
            return value;
          })
        );
      }
      // shipment history;
      if (
        action === "create" &&
        "$collectionId" in payload &&
        payload.$collectionId === shipmentHistoryCollection
      ) {
        //@ts-ignore
        const newHistory = payload as withId<shipmentHistoryT>;
        const shipmentWithHistory = shipments.find((item) => {
          return item.shipment.$id === newHistory.shipmentId;
        });
        if (shipmentWithHistory) {
          const histories = [newHistory, ...shipmentWithHistory.histories];
          shipmentWithHistory.histories = histories;
          setShipments((prev) =>
            prev.map((value) => {
              if (value.shipment.$id === shipmentWithHistory.shipment.$id) {
                return shipmentWithHistory;
              }
              return value;
            })
          );
        }
      }
      if (
        action === "update" &&
        "$collectionId" in payload &&
        payload.$collectionId === shipmentHistoryCollection
      ) {
        //@ts-ignore
        const newHistory = payload as withId<shipmentHistoryT>;
        console.log(payload);

        const shipmentWithHistory = shipments.find((item) => {
          return item.shipment.$id === newHistory.shipmentId;
        });
        console.log("Shipmentwith histpry", shipmentWithHistory);
        console.log("Shipmentwith histpry", shipments);

        if (shipmentWithHistory) {
          const histories = shipmentWithHistory.histories.map((value) => {
            if (value.$id === newHistory.$id) {
              return newHistory;
            } else {
              return value;
            }
          });
          shipmentWithHistory.histories = histories;
          setShipments((prev) =>
            prev.map((value) => {
              if (value.shipment.$id === shipmentWithHistory.shipment.$id) {
                return shipmentWithHistory;
              }
              return value;
            })
          );
        }
      }
    },
    [shipments, users]
  );

  useEffect(() => {
    let unsubscribe: () => void = () => {};
    if (user && shipments.length && !subscribed) {
      if (!user.isAdmin) {
        const historyIds: string[] = [];
        shipments.forEach((value) => {
          value.histories.forEach((item) => historyIds.push(item.$id));
        });
        unsubscribe = subscribeToUser(
          user.$id,
          shipments.map((value) => value.shipment.$id),
          historyIds,
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
    const shipmentsList: shipmentWithHistoryT[] = [];
    user &&
      getShipments(user).then(async (res) => {
        for (let shipment of res) {
          const histories = await getHistory(shipment.$id);
          if (
            typeof shipment.courier === "string" &&
            typeof shipment.receiver === "string"
          ) {
            shipment.courier = await getUserById(shipment.courier);
            shipment.receiver = await getUserById(shipment.receiver);
            shipment.courier.image = shipment.courier.image
              ? getImageUrl(shipment.courier.image)
              : undefined;
            shipment.receiver.image = shipment.receiver.image
              ? getImageUrl(shipment.receiver.image)
              : undefined;
          }
          shipment.image =
            shipment.image && typeof shipment.image === "string"
              ? getImageUrl(shipment.image)
              : undefined;
          shipmentsList.push({ shipment, histories });
        }
        setShipments(shipmentsList);

        console.log("Shipments in provider:", shipmentsList[0]);
      });
    user?.isAdmin &&
      getUsers().then((res) => {
        setUsers(res);
      });

    !user &&
      getMyInfo()
        .then((res) => {
          logIn(res.email);
          setUser(res);
        })
        .catch((e) => {
          setShipments([]);
          console.log(e);
        });
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        shipments,
        setShipments,
        user,
        setUser,
        notifications,
        setNotifications,
        placeApi,
        setUsers,
        users,
      }}
    >
      {children}

      <script
        defer
        async
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPSAPIKEY}&libraries=core,places,maps,geocoding&callback=InitializePlaces`}
      ></script>
    </AppContext.Provider>
  );
}

export default AppProvider;
