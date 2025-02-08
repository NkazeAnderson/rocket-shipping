import React, { useContext, useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  appContextT,
  dashBoardContextT,
  shipmentWithHistoryT,
} from "@/types/types";
import { AppContext } from "../ContextProviders/AppProvider";
import { Context } from "./DashBoardWrapper";

function ShipmentMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPSAPIKEY as string,
  });
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const {
    shipmentsMethods: { shipments },
  } = useContext(AppContext) as appContextT;
  const { sidePanelContent, setShowSidePanel, setSidePanelContent } =
    useContext(Context) as dashBoardContextT;
  const shipment = shipments.find((_) => _.$id === sidePanelContent?.id);
  const lastHistory = shipment?.extras?.histories
    ? shipment?.extras?.histories.toReversed()[0]
    : undefined;
  if (
    !shipment ||
    !lastHistory ||
    !shipment.originLat ||
    !shipment.originLong ||
    !shipment.destinationLat ||
    !shipment.destinationLong ||
    !lastHistory.currentLat ||
    !lastHistory.currentLong
  ) {
    return null;
  }

  const origin = {
    lat: shipment.originLat,
    lng: shipment.originLong,
  };
  const current = {
    lat: lastHistory.currentLat,
    lng: lastHistory.currentLong,
  };

  const destination = {
    lat: shipment.destinationLat,
    lng: shipment.destinationLong,
  };
  function onLoad(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(origin);
    bounds.extend(destination).extend(current);
    map.fitBounds(bounds);

    setMap(map);
  }
  const customMarkerIcon = {
    url: (shipment.image as string) || "./courier.png",
    scaledSize: new google.maps.Size(50, 50),
  };

  function onUnmount(map: google.maps.Map) {
    setMap(null);
  }
  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={{ width: "100%", flex: 1 }}
        center={current}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {origin.lat !== current.lat && origin.lng !== current.lng && (
          <Marker
            position={origin}
            label={{
              text: "Origin",
              className: "pb-48 text-success font-semibold",
            }}
          />
        )}
        <Marker
          position={destination}
          label={{
            text: "Destination",
            className: "pb-48 text-success font-semibold",
          }}
        />
        <Marker
          position={current}
          label={{
            text: "Current location",
            className: "pb-48 text-success font-semibold",
          }}
        />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default ShipmentMap;
