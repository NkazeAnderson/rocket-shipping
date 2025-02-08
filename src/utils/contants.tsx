import { notificationT } from "@/types/schemas";
import {
  locationT,
  navLinkT,
  statusT,
  modeT,
  paymentMethodT,
  packageT,
  actionsT,
  serviceT,
  certT,
  reviewT,
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

export const defaultAccess = "RS-0658389854";

export const contactInfo = {
  email: "info@rocketshippping.com",
};

export const notifications: notificationT[] = [
  {
    $id: "76655556",
    heading: "New shipment Registered",
    description: "You have a new shipment",
    appEntity: "shipment",
    appEntityId: "123456789",
    viewed: false,
  },
  {
    $id: "766555562",
    heading: "New shipment Registered",
    description: "You have a new shipment",
    appEntity: "shipment",
    appEntityId: "123456789",
    viewed: false,
    action: "Insurance",
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

export const actions: actionsT[] = [
  "Crate change",
  "Insurance",
  "None",
  "Clearance",
  "Accommodation",
  "Change of state",
  "City permit",
  "Crate fee",
  "Delivery fee",
  "Smoke test",
  "Insurance renewal",
  "Step up Insurance",
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

export const services: serviceT[] = [
  {
    name: "Tracking",
    description:
      "Proactive shipment tracking that delights your customers, reduces WISMO tickets, and optimizes your delivery performance.",
    features: [
      "Branded tracking page",
      "Shipment visibility dashboard",
      "Exception report",
    ],
  },
  {
    name: "Returns",
    description:
      "Returns automation that delivers a positive returns and exchange experience, optimizes return costs, and retains more revenue.",
    features: [
      "Branded returns page",
      "Exchange for other items",
      "Rule-based automation",
    ],
  },
  {
    name: "Warranty",
    description:
      "Warranty automation that eliminates manual processes, enhances the experience, and unlocks product insights.",
    features: [
      "Branded warranty page",
      "Product recall",
      "Omnichannel warranty claims",
    ],
  },
  {
    name: "Protection",
    description:
      "World-class shipping protection that captures lost revenue, drives customer satisfaction, and optimizes claims operations.",
    features: [
      "High claim-success rate",
      "Protection at cart or checkout",
      "Claim management portal",
    ],
  },
  {
    name: "EDD",
    description:
      "AI-powered delivery date estimates that drive conversion, set customers’ expectations, and offer peace of mind.",
    features: [
      "Street-level prediction",
      "On-time performance dashboard",
      "EDD on checkout page",
    ],
  },
  {
    name: "Shipping",
    description:
      "Shipping management platform that facilitates fulfillment, reduces costs, and simplifies shipment management for all your carriers.",
    features: [
      "Label generation",
      "Real-time rate calculation",
      "Automated shipping workflow",
    ],
  },
];

export const certs: certT[] = [
  {
    image: "/cert1.png",
    name: "SOC 2 compliance",
    description:
      "Certified to meet SOC 2 standards for worry-free data security.",
  },
  {
    image: "/cert2.png",
    name: "ISO 27001 certification",
    description:
      "Compliant with the world’s most rigorous standards for information security and privacy.",
  },
  {
    image: "/cert3.png",
    name: "GDPR compliance",
    description: "GDPR certified to protect data and privacy in Europe.",
  },
];

export const reviews: reviewT[] = [
  {
    name: "Anthony A.",
    image: "/reviewer1.png",
    rating: 5,
    text: "My package arrived ahead of schedule! The tracking system was easy to use, and the customer service representative was very helpful when I had a question. Highly recommend!",
  },

  {
    name: "Miriam K.",
    image: "/reviewer2.jpg",
    rating: 5,
    text: "I've used this shipping company several times now, and I'm always impressed. Their prices are competitive, and their service is top-notch. I'll definitely use them again.",
  },
  {
    name: "Bilton H.",
    image: "/reviewer3.jpg",
    rating: 4,
    text: "I had a great experience with this shipping company. They were very responsive and kept me updated throughout the entire process. I'll definitely be using them again in the future.",
  },
  {
    name: "Kennedy W.",
    image: "/reviewer4.jpg",
    rating: 5,
    text: "The customer service at this shipping company is outstanding. They went above and beyond to help me with a shipping issue, and I'm so grateful for their assistance.",
  },
  {
    name: "Alexander U.",
    image: "/reviewer5.jpg",
    rating: 5,
    text: "I was very impressed with the speed and efficiency of this shipping company. My package arrived on time and in perfect condition. I'll definitely be using them again for all my shipping needs.",
  },
  {
    name: "Thomas J.",
    image: "/reviewer6.jpg",
    rating: 4,
    text: "I was pleasantly surprised by how smooth the entire shipping process was. The packaging was secure, and my item arrived in perfect condition. Great job!",
  },
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
export const notificationCollection = "675b45d300208e18a44f";
export const emailFunctionId = "675916f600015aaab7ed";
export const profilePicPlaceholder =
  "https://cloud.appwrite.io/v1/storage/buckets/671bbd68001407857b37/files/67210bf6001ce8f34c2c/view?project=6674479b00230f8c4e57&project=6674479b00230f8c4e57";
