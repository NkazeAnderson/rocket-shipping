import { IconType } from "react-icons";
import { HookReturn } from "use-places-autocomplete";
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

// type userT = {
//   name: string;
//   email: string;
//   phone?: string;
//   access?: string;
//   image?: string;
//   isAdmin?: boolean;
// };
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

type shipmentT = {
  shipperName: string;
  shipperEmail: string;
  origin: string;
  originLat?: number;
  originLong?: number;
  destination: string;
  destinationLat?: number;
  destinationLong?: number;
  receiver: string | withId<userT>;
  courier: string | withId<userT>;
  pickupDate: string;
  deliveryDate: string;
  eta: string;
  product: string;
  mode: modeT;
  paymentMethod: paymentMethodT;
  quantity: number;
  weight: number;
  image?: string | FileList;
  package: packageT;
  action?: actionsT;
  conversationId?: string;
};

type shipmentHistoryT = {
  date: string;
  currentLocation: string;
  currentLat?: number;
  currentLong?: number;
  status: statusT;
  shipmentId: string;
};
type conversationT = {
  member1: string | withId<userT>;
  member2: string | withId<userT>;
  lastMessage?: string | "shipping-img-new";
};

type messageT = {
  sender: string;
  text?: string;
  read?: boolean;
  image?: string;
  conversationId: string;
  timeStamp: number;
};

type conversationWithMessageT = withId<conversationT> & {
  messages: withId<messageT>[];
  lastMessage?: string;
  unread?: number;
  ago?: string;
};

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
type appContextT = {
  shipments: shipmentWithHistory[];
  setShipments: React.Dispatch<React.SetStateAction<shipmentWithHistoryT[]>>;
  user: withId<userT> | undefined;
 // setUser: React.Dispatch<React.SetStateAction<withId<userT> | undefined>>;
  users: withId<userT>[];
  setUsers: React.Dispatch<React.SetStateAction<withId<userT>[]>>;
  notifications: withId<notificationT>[];
  setNotifications: React.Dispatch<
    React.SetStateAction<withId<notificationT>[]>
  >;
  conversations: conversationWithMessageT[];
  setConversations: React.Dispatch<
    React.SetStateAction<conversationWithMessageT[]>
  >;
  placeApi: HookReturn;
};
type withId<T> = T & { $id: string };
