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
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main
      id="homeWrapper"
      className=" overflow-y-scroll overflow-x-hidden w-full h-full"
    >
      <Hero />
      <Partners />
      <Services />
      <WhyUs />
      <Gallery />
      <Reviews />
      <GetQuote />
      <Tracker />
      <Footer />
    </main>
  );
}
