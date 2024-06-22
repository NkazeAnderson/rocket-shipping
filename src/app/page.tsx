import Image from "next/image";
import { Client } from "appwrite";
import Hero from "@/components/homePage/Hero";
import SectionTitle from "@/components/SectionTitle";
import Partners from "@/components/homePage/Partners";
import Services from "@/components/homePage/Services";
import WhyUs from "@/components/homePage/WhyUs";
import Gallery from "@/components/homePage/Gallery";
import Reviews from "@/components/homePage/Reviews";
import GetQuote from "@/components/homePage/GetQuote";
import Tracker from "@/components/homePage/Tracker";
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6674479b00230f8c4e57");
export default function Home() {
  return (
    <main className="">
      <Hero />
      <Partners />
      <Services />
      <WhyUs />
      <Gallery />
      <Reviews />
      <GetQuote />
      <Tracker />
    </main>
  );
}
