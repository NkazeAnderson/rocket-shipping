import {
  conversationT,
  locationT,
  messageT,
  navLinkT,
  notificationT,
  shipmentT,
  userT,
} from "@/types/types";
import { FaHome, FaEdit } from "react-icons/fa";

export const navLinks: navLinkT[] = [
  { text: "Home", icon: FaHome, path: "/" },
  { text: "Dashboard", icon: FaEdit, path: "/dashboard" },
  { text: "Contact", icon: FaHome, path: "/" },
  { text: "FAQs", icon: FaHome, path: "/" },
];
export const partners: string[] = [
  "/partner1.png",
  "/partner2.png",
  "/partner3.png",
  "/partner4.png",
  "/partner5.png",
  "/partner6.png",
];

export const notifications: notificationT[] = [
  {
    id: "Nt-1",
    text: "New Shipment from New York to Miami is now registered for delivery ORDER NO: RS-108287177271",
    title: "New Shipment Registered",
    subjectId: "Sh-1",
    subject: "shipment",
  },
  {
    id: "Nt-2",
    text: "New Shipment from New York to Miami is now registered for delivery ORDER NO: RS-108287177271",
    title: "New Shipment Registered",
    subjectId: "Sh-2",
    subject: "shipment",
    action: "Insurance",
    conversationId: "Cv-1",
  },
];

export const users: userT[] = [
  {
    id: "Us-1",
    name: "John Doe",
    email: "johnDoe@gmail.com",
    phone: "625526666",
  },
  {
    id: "Us-2",
    name: "Mary Jane",
    email: "maryjane@gmail.com",
    phone: "625546666",
  },
  {
    id: "Us-3",
    name: "Anthony Johnson",
    email: "AnthonyJohson@gmail.com",
    phone: "625546866",
    image: "/courier.png",
    isAdmin: true,
  },
];
export const locations: locationT[] = [
  {
    street: "1872 West Bright E",
    cityStateCountry: "houston, TX, USA",
    zip: "17772",
  },
  {
    street: "1872 West Bright w",
    cityStateCountry: "San Angeles, CA, USA",
    zip: "23772",
  },
];
export const shipments: shipmentT[] = [
  {
    id: "Sh-1",
    sender: users[0],
    receiver: users[1],
    origin: locations[0],
    destination: locations[1],
    currentLocation: locations[0],
    quantity: 1,
    package: "Crate",
    status: "Registered",
    product: "Pet",
    pickupDate: "Wed, 18 July 2024",
    deliveryDate: "Thurs, 20 July 2024",
    eta: "10:00 am",
    mode: "Land Transport",
    courier: users[2],
  },
  {
    id: "Sh-2",
    sender: users[0],
    receiver: users[1],
    origin: locations[0],
    destination: locations[1],
    currentLocation: locations[0],
    quantity: 1,
    package: "Pallet",
    status: "In Transit",
    product: "Power Tools",
    pickupDate: "Wed, 18 July 2024",
    deliveryDate: "Thurs, 20 July 2024",
    eta: "12:00 pm",
    mode: "Air Freight",
    action: "Insurance",
    courier: users[2],
  },
];

export const conversations: conversationT[] = [
  {
    id: "Cv-1",
    lastmessage:
      "Hello My dear friend, How are you doing?. Hope all good, I wish to remind you about our deals",
    unread: 1,
    memberId1: users[2],
    memberId2: users[0],
    ago: "2 mins",
  },
  {
    id: "Cv-2",
    lastmessage: "",
    unread: 10,
    memberId1: users[2],
    memberId2: users[1],
    ago: "10 mins",
  },
];

export const messages: messageT[] = [
  {
    id: "Ms-1",
    isSender: false,
    time: " 10:00 am",
    day: "Yesterday",
    read: false,
    conversationId: "Cv-1",
    text: "Hello My dear friend, How are you doing?. Hope all good, I wish to remind you about our deals",
  },
  {
    id: "Ms-2",
    isSender: false,
    time: "11:00 am",
    day: "Yesterday",
    read: false,
    conversationId: "Cv-1",
    text: "Hello there my friend",
  },
  {
    id: "Ms-3",
    isSender: true,
    time: " 12:00 pm",
    day: "Yesterday",
    read: false,
    conversationId: "Cv-1",
    image: "/image-placeholder.jpg",
  },
  {
    id: "Ms-4",
    isSender: true,
    time: " 12:00 pm",
    day: "Yesterday",
    read: true,
    conversationId: "Cv-1",
    text: "Hi",
  },
  {
    id: "Ms-5",
    isSender: true,
    time: " 12:00 pm",
    day: "Yesterday",
    read: true,
    conversationId: "Cv-2",
    text: "Hi",
  },
  {
    id: "Ms-5",
    isSender: true,
    time: " 12:00 pm",
    day: "Yesterday",
    read: true,
    conversationId: "Cv-2",
    image: "/image-placeholder.jpg",
  },
];
