import Image from "next/image";
import { Client } from "appwrite";
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6674479b00230f8c4e57");
export default function Home() {
  return (
    <main>
      <p>Paragraph</p>
      <h1>1</h1>
      <h2>2</h2>
      <h3>3</h3>
      <h4>4</h4>
      <h5>5</h5>
    </main>
  );
}
