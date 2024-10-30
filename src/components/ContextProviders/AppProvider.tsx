"use client";
import { logIn } from "@/actions";
import {
  appContextT,
  notificationT,
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
} from "@/utils/appwrite";
import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext<appContextT | undefined>(undefined);

function AppProvider({ children }: { children: React.ReactNode }) {
  const [shipments, setShipments] = useState<shipmentWithHistoryT[]>([]);
  const [user, setUser] = useState<withId<userT> | undefined>(undefined);
  const [notifications, setNotifications] = useState<withId<notificationT>[]>(
    []
  );
  useEffect(() => {
    const shipmentsList: shipmentWithHistoryT[] = [];
    console.log("user", user);
    console.log("shipments", shipments);

    user &&
      getShipments().then(async (res) => {
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
          shipmentsList.push({ shipment, histories });
        }
        console.log(shipmentsList);

        setShipments(shipmentsList);
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
    console.log("user effect");
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvider;
