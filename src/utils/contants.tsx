import {
  conversationT,
  locationT,
  messageT,
  navLinkT,
  notificationT,
  shipmentHistoryT,
  shipmentT,
  userT,
  statusT,
  modeT,
  paymentMethodT,
  packageT,
  userFormGroupT,
  shipmentFormGroupT,
} from "@/types/types";
import { FaHome, FaEdit } from "react-icons/fa";
import { GiCargoShip } from "react-icons/gi";
import { MdEmail } from "react-icons/md";

export const navLinks: navLinkT[] = [
  { text: "Home", icon: FaHome, path: "/" },
  { text: "Dashboard", icon: FaEdit, path: "/dashboard" },
  { text: "Contact", icon: MdEmail, path: "/contact" },
  { text: "About Us", icon: GiCargoShip, path: "/about-us" },
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

export const status: statusT[] = [
  "Registered",
  "Picked Up",
  "Out for Delivery",
  "In Transit",
  "On Hold",
  "Cancelled",
  "Delivered",
];
export const modes: modeT[] = [
  "Air Freight",
  "Land Transport",
  "Rail Transport",
  "Ship Transport",
];
export const paymentModes: paymentMethodT[] = [
  "Cash",
  "Zelle",
  "Apple Pay",
  "Gift Card",
  "Cashapp",
  "Paypal",
  "Google Pay",
  "Credit Card",
  "Bank",
];
export const packages: packageT[] = ["Crate", "Pallet", "Carton", "Envelope"];
export const shipments: shipmentT[] = [
  {
    id: "Sh-1",
    sender: users[0],
    receiver: users[1],
    origin: locations[0],
    destination: locations[1],
    currentLocation: locations[0],
    quantity: 2,
    package: "Crate",
    status: "Registered",
    product: "Pet",
    pickupDate: "Wed, 18 July 2024",
    deliveryDate: "Thurs, 20 July 2024",
    eta: "10:00 am",
    mode: "Land Transport",
    courier: users[2],
    weight: 4,
    paymentMethod: "Cash",
    conversationId: "Cv-1",
    action: "Insurance",
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
    weight: 2,
    paymentMethod: "Paypal",
    conversationId: "Cv-2",
  },
];

export const shipmentHistory: shipmentHistoryT[] = [
  {
    id: "SLH-1",
    location: "123 west vimnord, Talahasse, WV, USA, 19920",
    date: "June 11, 2024",
    time: "10:00 am",
    status: "Registered",
    shipmentId: "Sh-1",
  },
  {
    id: "SLH-2",
    location: "123 west vimnord, Talahasse, WV, USA, 19920",
    date: "June 11, 2024",
    time: "11:00 am",
    status: "In Transit",
    shipmentId: "Sh-1",
  },
  {
    id: "SLH-3",
    location: "123 west vimnord, Talahasse, WV, USA, 19920",
    date: "June 11, 2024",
    time: "11:00 am",
    status: "Delivered",
    shipmentId: "Sh-1",
  },
  {
    id: "SLH-4",
    location: "123 west vimnord, Talahasse, WV, USA, 19920",
    date: "June 11, 2024",
    time: "10:00 am",
    status: "Registered",
    shipmentId: "Sh-2",
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

export const ourValues: { image: string; title: string; text: string }[] = [
  {
    image: "/smart.webp",
    title: "Customer Success",
    text: "The success of our customers is at the core of what we do. We succeed when our customers succeed.",
  },
  {
    image: "/smart1.webp",
    title: "Geeky Spirit",
    text: "We are curious and passionate about what we do. We thrive when we are continuously raising the bar for ourselves and our team.",
  },
  {
    image: "/smart2.webp",
    title: "Quick Delivery",
    text: "We work in a highly competitive market and must deliver quality work as fast as possible to stay ahead.",
  },
  {
    image: "/smart3.webp",
    title: "Keep it Simple",
    text: "We put all our energy into work and aim for continual progress. We adhere to a flat organizational structure, keeping our communications simple and straightforward.",
  },
  {
    image: "/smart4.webp",
    title: "Diversity and Inclusion",
    text: "We value talent and drive above all else. We welcome and respect diversity in all its forms - race, language, culture, beliefs, gender, and identity.",
  },
];

export const aboutPartners: { image: string; text: string }[] = [
  { image: "/wise.webp", text: "Wise" },
  { image: "/harry.webp", text: "Harry" },
  { image: "/etsy.webp", text: "Etsy" },
  { image: "/manomano.webp", text: "ManoMano" },
  { image: "/Rakuten.webp", text: "Rakuten" },
];

export const companyInfo: {
  name: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
} = {
  name: "Rocket Shipping",
  logo: "/logo.png",
  email: "info@rocketshippping.com",
  phone: "+19727727261",
  address: "123 East Baffalo, New York, NY, 10882",
};

export const shipmentFormGroup: shipmentFormGroupT = {
  shipperName: "",
  shipperEmail: "",
  originStreet: "",
  origin: "",
  originZip: "",
  receiver: "",
  destinationStreet: "",
  destination: "",
  destinationZip: "",
  courier: "",
  pickUpDate: "",
  deliveryDate: "",
  eta: "",
  product: "",
  package: "",
  mode: "",
  quantity: "",
  weight: "",
  image: "",
  status: "",
  action: "",
};

export const userFormGroup: userFormGroupT = {
  name: "",
  email: "",
  access: "",
  phone: "",
  picture: "",
};

export const database = "66a76afd0037bfc1a9fc";
export const userCollection = "66a76bc00017ba31b41d";
export const shipmentCollection = "66a76de00030d63f37e0";
