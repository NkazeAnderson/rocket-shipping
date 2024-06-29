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
          <div className="fixed w-screen z-50">
            <NavBar />
          </div>
          <div className="overflow-y-hidden overflow-x-hidden w-full h-full">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
