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
  actionsT,
} from "@/types/types";

export const navLinks: navLinkT[] = [
  { text: "Home", icon: "FaHome", path: "/" },
  { text: "Dashboard", icon: "FaEdit", path: "/dashboard" },
  { text: "Contact", icon: "MdEmail", path: "/contact" },
  { text: "About Us", icon: "GiCargoShip", path: "/about-us" },
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
    name: "John Doe",
    email: "johnDoe@gmail.com",
    phone: "625526666",
  },
  {
    name: "Mary Jane",
    email: "maryjane@gmail.com",
    phone: "625546666",
  },
  {
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
    shipperName: "string",
    shipperEmail: "string",
    origin: "string",
    destination: "string",
    receiver: "string",
    courier: "string",
    pickupDate: "string",
    deliveryDate: "string",
    eta: "string",
    product: "string",
    mode: "Land Transport",
    paymentMethod: "Bank",
    quantity: 1,
    weight: 1,
    image: "string",
    package: "Crate",
    action: "None",
    conversationId: "string",
  },
];

export const shipmentHistory: shipmentHistoryT[] = [
  {
    currentLocation: "123 str",
    date: "June 11, 2024",
    status: "Delivered",
    shipmentId: "Sh-1",
  },
];
export const actions: actionsT[] = ["Crate change", "Insurance", "None"];

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

export const database = "66a76afd0037bfc1a9fc";
export const bucket = "671bbd68001407857b37";
export const userCollection = "66a76bc00017ba31b41d";
export const shipmentCollection = "66a76de00030d63f37e0";
export const shipmentHistoryCollection = "671ca238002e6cd68770";
export const conversationCollection = "672701ec00298c0187f1";
export const messageCollection = "672701fc0018283d308f";
export const profilePicPlaceholder =
  "https://cloud.appwrite.io/v1/storage/buckets/671bbd68001407857b37/files/67210bf6001ce8f34c2c/view?project=6674479b00230f8c4e57&project=6674479b00230f8c4e57";
