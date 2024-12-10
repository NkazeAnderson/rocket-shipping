import { IconType } from "react-icons";
import { HookReturn } from "use-places-autocomplete";
import { conversationT, messageT, shipmentHistoryT, shipmentT } from "./schemas";
import { useUserT } from "../../hooks/useUser";
import { useShipmentT } from "../../hooks/useShipments";
import { useConversationsT } from "../../hooks/useConversations";
type navLinkT = { text: string; icon: string; path: string };
type button = {
  text: string;
  icon?: IconType;
  disabled?: boolean;
  pending?: boolean;
  action?: () => {};
};
type subjectT = "shipment" | "notification" | "conversation" | "admin";
type activeTabT = "home" | "conversations" | "notifications" | "shipments";
type sidePanelContentT = {
  subject: subjectT;
  id: string;
  maps?: boolean;
};
type dashBoardContextT = {
  activeTab: activeTabT;
  setActiveTab: React.Dispatch<React.SetStateAction<activeTabT>>;
  setShowSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
  sidePanelContent: null | sidePanelContentT;
  setSidePanelContent: React.Dispatch<
    React.SetStateAction<sidePanelContentT | null>
  >;
};

type serviceT = {
  description: string;
  features: string[];
  name: string;
};

type certT = {
  image: string;
  name: string;
  description: string;
};

type reviewT = {
  image: string;
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
};

type notificationT = {
  id: string;
  title: string;
  text: string;
  subjectId: string;
  subject: subjectT;
  action?: string;
  conversationId?: string;
};

type signUpFormT = Required<Pick<userT, "name" | "email" | "access">>;
type loginFormT = Required<Pick<userT, "email" | "access">>;
type locationT = {
  street: string;
  cityStateCountry: string;
  zip: string;
};
type statusT =
  | "Registered"
  | "Picked Up"
  | "Out for Delivery"
  | "In Transit"
  | "On Hold"
  | "Cancelled"
  | "Delivered";
type modeT =
  | "Air Freight"
  | "Land Transport"
  | "Rail Transport"
  | "Ship Transport";
type packageT = "Crate" | "Pallet" | "Carton" | "Envelope";
type paymentMethodT =
  | "Cash"
  | "Zelle"
  | "Apple Pay"
  | "Gift Card"
  | "Cashapp"
  | "Paypal"
  | "Google Pay"
  | "Credit Card"
  | "Bank";



type formRegisterT = UseFormRegister<FieldValues>;

type actionsT =
  | "Insurance"
  | "Crate change"
  | "None"
  | "Clearance"
  | "Accommodation"
  | "Change of state"
  | "City permit"
  | "Crate fee"
  | "Delivery fee"
  | "Smoke test"
  | "Insurance renewal"
  | "Step up Insurance";
type shipmentWithHistoryT = {
  shipment: withId<shipmentT>;
  histories: withId<shipmentHistoryT>[];
};

export type RealTimeSubscriptionPayload = {$collectionId:string}&Record<string, string>
export type RealTimeSubscriptionCallbackPayload = {action:"create"|"update", target:"user", data:userT }
|{action:"create"|"update", target:"shipment", data:shipmentT }
|{action:"create"|"update", target:"shipmentHistory", data:shipmentHistoryT }|
{action:"create"|"update", target:"conversation", data:conversationT }|
{action:"create", target:"message", data:messageT }

type appContextT = {
  shipmentsMethods:useShipmentT,
  userMethods:useUserT,
  conversationsMethods:useConversationsT
  notifications: withId<notificationT>[];
  setNotifications: React.Dispatch<
    React.SetStateAction<withId<notificationT>[]>
  >;
  
  placeApi: HookReturn;
};
type withId<T> = T & { $id: string };
