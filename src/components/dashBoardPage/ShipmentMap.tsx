import React, { useMemo } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { shipmentHistoryT, shipmentWithHistoryT } from "@/types/types";

function ShipmentMap({ shipment }: { shipment: shipmentWithHistoryT }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAPSAPIKEY as string,
  });
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const lastHistory = shipment.histories[shipment.histories.length - 1];
  if (
    !shipment.shipment.originLat ||
    !shipment.shipment.originLong ||
    !shipment.shipment.destinationLat ||
    !shipment.shipment.destinationLong ||
    !lastHistory.currentLat ||
    !lastHistory.currentLong
  ) {
    return null;
  }

  const origin = {
    lat: shipment.shipment.originLat,
    lng: shipment.shipment.originLong,
  };
  const current = {
    lat: lastHistory.currentLat,
    lng: lastHistory.currentLong,
  };

  const destination = {
    lat: shipment.shipment.destinationLat,
    lng: shipment.shipment.destinationLong,
  };
  function onLoad(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(origin);
    bounds.extend(destination).extend(current);
    map.fitBounds(bounds);

    setMap(map);
  }
  const customMarkerIcon = {
    url: "./courier.png",
    scaledSize: new google.maps.Size(50, 50),
  };

  function onUnmount(map: google.maps.Map) {
    setMap(null);
  }
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ width: "100%", flex: 1 }}
      center={current}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <Marker
        position={origin}
        label={{
          text: "Origin",
          className: "pb-48 text-success font-semibold",
        }}
      />
      <Marker
        position={destination}
        label={{
          text: "Destination",
          className: "pb-48 text-success font-semibold",
        }}
      />
      <Marker
        position={current}
        icon={customMarkerIcon}
        label={{
          text: "Current location",
          className: "pb-48 text-success font-semibold",
        }}
        animation={google.maps.Animation.BOUNCE}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default ShipmentMap;
