import { shipmentHistoryT, shipmentT } from "@/types/schemas";
import { useState } from "react";

export default function useShipments() {
    const [shipments, setShipments] = useState<shipmentT[]>([]);

    function addNewShipment(shipment:shipmentT) {
        setShipments(prev=>[shipment, ...prev])
    }
    function addNewShipments(shipment:shipmentT[]) {
        setShipments(prev=>[...shipment, ...prev])
    }
   
    function editShipment(shipment:shipmentT) {
        setShipments(prev=>prev.map(item=>{
            if (item.$id === shipment.$id) {
                return shipment
            }
            return item
        }))
    }
    function addShipmentHistory(shipmentHistory:shipmentHistoryT){
        const shipment = shipments.find(item=>item.$id===shipmentHistory.shipmentId)
        if (shipment) {
            if (shipment.extras ) {
              const histories =  shipment.extras.histories
              shipment.extras.histories = [shipmentHistory, ...histories]
              editShipment(shipment)
            }
        }
    }
    function editShipmentHistory(shipmentHistory:shipmentHistoryT){
        const shipment = shipments.find(item=>item.$id===shipmentHistory.shipmentId)
        console.log("edit history");
        console.log(shipment);
        console.log(shipmentHistory);
         
        
        if (shipment) {
            if (shipment.extras ) {
              shipment.extras.histories = shipment.extras.histories.map(item=>{
                if (item.$id === shipmentHistory.$id) {
                    return shipmentHistory
                }
                return item
              })
              editShipment(shipment)
            }
        }
    }
    return {shipments: shipments.toReversed(), addNewShipment, addNewShipments, editShipment, addShipmentHistory, editShipmentHistory}   
}

export type useShipmentT = ReturnType<typeof useShipments>