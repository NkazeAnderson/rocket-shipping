import { IconType } from "react-icons";
type navLinkT = { text: string; icon: IconType; path: string };
type button = { text: string; icon?: IconType };
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

type notificationT = {
  id: string;
  title: string;
  text: string;
  subjectId: string;
  subject: subjectT;
  action?: string;
  conversationId?: string;
};

type userT = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password?: string;
  image?: string;
  isAdmin?: boolean;
};
type locationT = {
  street: string;
  cityStateCountry: string;
  zip: string;
};
const statusT =
  "Registered" |
  "Picked Up" |
  "Out for Delivery" |
  "In Transit" |
  "On Hold" |
  "Cancelled" |
  "Delivered";
const modeT =
  "Air Freight" | "Land Transport" | "Rail Transport" | "Ship Transport";
const packageT = "Crate" | "Pallet" | "Carton" | "Envelope";
type shipmentT = {
  id: string;
  sender: userT;
  receiver: userT;
  courier: userT;
  origin: locationT;
  currentLocation: locationT;
  destination: locationT;
  quantity: number;
  mode: modeT;
  pickupDate: string;
  deliveryDate: string;
  eta: string;
  product: string;
  status: statusT;
  package: packageT;
  action?: string;
  image?: string | File;
  conversationId?: string;
};
type conversationT = {
  id: string;
  memberId1: userT;
  memberId2: userT;
  lastmessage: string;
  ago: string;
  unread: number;
};

type messageT = {
  id: string;
  isSender?: boolean;
  text?: string;
  read?: boolean;
  image?: string;
  conversationId: string;
  time: string;
  day: string;
};
