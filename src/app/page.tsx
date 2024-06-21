import Image from "next/image";
import { Client } from "appwrite";
import Hero from "@/components/homePage/Hero";
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6674479b00230f8c4e57");
export default function Home() {
  return (
    <main className="">
      <Hero />
    </main>
  );
}
