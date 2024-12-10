//import { setAlert } from "@/actions";
import Head from "next/head";
import Script from "next/script";
import React from "react";

async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full h-full overflow-x-hidden bg-primary/10 overflow-y-hidden"
      style={{ scrollbarWidth: "none" }}
    >
      {children}

      <Script src={`./scripts/index.js`} />
      <Script
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMAPSAPIKEY}&libraries=core,places,maps,geocoding&callback=InitializePlaces`}
      />
    </div>
  );
}

export default DashboardLayout;
