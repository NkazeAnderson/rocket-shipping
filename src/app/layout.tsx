import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rocket Shipping",
  description: "Best Shipping agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-screen h-screen relative">
          <div className="absolute w-screen">
            <NavBar />
          </div>
          <div className="">{children}</div>
        </div>
      </body>
    </html>
  );
}
