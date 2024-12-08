import { shipmentHistorySchema, shipmentHistoryT, shipmentSchema, shipmentT, userT } from "@/types/schemas";
import { addNewFile, db, getImageUrl, getUserById } from "../appwrite";
import { database, shipmentCollection, shipmentHistoryCollection } from "../contants";
import { ID, Query } from "appwrite";
import { shipmentWithHistoryT } from "@/types/types";
import { getLatLong, stripOutAppwriteMetaData } from "..";

function prepareShipmentForDb(shipment:shipmentT) {
  shipment.extras && delete shipment.extras
  return stripOutAppwriteMetaData(shipmentSchema.omit({$id:true}).parse(shipment))
}

function prepareShipmentHistoryForDb(shipmentHistory:shipmentHistoryT) {
  return stripOutAppwriteMetaData(shipmentHistorySchema.omit({$id:true}).parse(shipmentHistory))
}

export async function addShipment(shipment:shipmentT) {
    const id = ID.unique()
    const originCords = await getLatLong(shipment.origin);
    const destinationCords = await getLatLong(shipment.destination);
    shipment.originLat = originCords.lat;
    shipment.originLong = originCords.lng;
    shipment.destinationLat = destinationCords.lat;
    shipment.destinationLong = destinationCords.lng;
    shipment.pickupDate = shipment.pickupDate.split("T")[0];
    shipment.deliveryDate = shipment.deliveryDate.split("T")[0]
    shipment.action = "None";
    shipment.quantity = Number(shipment.quantity)
    shipment.weight = Number(shipment.weight)
    if (
      shipment.extras?.imageToUpload?.length
    ) {
     const imageId = await addNewFile(shipment.extras.imageToUpload[0])
      shipment.image = imageId;
    } 
    await db.createDocument(database, shipmentCollection, id, prepareShipmentForDb(shipment));
    const shipmentHistory: shipmentHistoryT = {
      $id:"",
      currentLocation: shipment.origin,
      currentLat: shipment.originLat,
      currentLong: shipment.originLong,
      status: "Registered",
      date: shipment.pickupDate,
      shipmentId:id,
    };
    await addShipmentHistory(id, shipmentHistory)
    return id
}
export async function addShipmentHistory(shipmentId:string, shipmentHistory:shipmentHistoryT) {
    const id = ID.unique()
    shipmentHistory.shipmentId = shipmentId
    const currentCords = await getLatLong(shipmentHistory.currentLocation);
      shipmentHistory.currentLat = currentCords.lat;
      shipmentHistory.currentLong = currentCords.lng;
    const {$id} =  await db.createDocument(database, shipmentHistoryCollection, id, prepareShipmentHistoryForDb(shipmentHistory));
    return $id
}

export async function updateShipmentHistory(shipmentHistory:shipmentHistoryT, previewShipmentHistory:shipmentHistoryT) {
  if (shipmentHistory.currentLocation !== previewShipmentHistory.currentLocation) {
    debugger
    const currentCords = await getLatLong(shipmentHistory.currentLocation);
    shipmentHistory.currentLat = currentCords.lat;
    shipmentHistory.currentLong = currentCords.lng;
  }
    const {$id} =  await db.updateDocument(database, shipmentHistoryCollection, shipmentHistory.$id, prepareShipmentHistoryForDb(shipmentHistory));
    return $id
}

export async function updateShipment(shipment:shipmentT, previousShipment: shipmentT) {
  shipment.pickupDate = shipment.pickupDate.split("T")[0];
  shipment.deliveryDate = shipment.deliveryDate.split("T")[0]
  shipment.quantity = Number(shipment.quantity)
  shipment.weight = Number(shipment.weight)
  if (
    shipment.extras?.imageToUpload?.length
  ) {
   const imageId = await addNewFile(shipment.extras.imageToUpload[0])
    shipment.image = imageId;
  }
  
  if (shipment.origin !== previousShipment.origin) {
    const originCords = await getLatLong(shipment.origin);
    shipment.originLat = originCords.lat;
    shipment.originLong = originCords.lng;
  }
  if (shipment.destination !== previousShipment.destination) {
    const destinationCords = await getLatLong(shipment.destination);
    shipment.destinationLat = destinationCords.lat;
    shipment.destinationLong = destinationCords.lng;
  }
   await db.updateDocument(database, shipmentCollection, shipment.$id, prepareShipmentForDb(shipment));
}

export async function getShipments(user: userT) {
    const shipmentsList: shipmentWithHistoryT[] = [];
    const shipmentsRef = user.isAdmin
      ? await db.listDocuments(database, shipmentCollection)
      : await db.listDocuments(database, shipmentCollection, [
          Query.equal("receiver", user.$id),
        ]);

    const shipments:shipmentT[] = shipmentSchema.array().parse(shipmentsRef.documents)
    for (let index in shipments) {
      const shipment = shipments[Number(index)]
      shipment.extras = {
          histories:await getShipmentHistory(shipment.$id),
          imageUrl:getImageUrl(shipment.image),
          courierInfo: await getUserById(shipment.courier),
          receiverInfo: await getUserById(shipment.receiver),
        }
    }
    return shipments;
  }
  
  export async function getShipmentHistory(shipmentId: string) {
    const historyRef = await db.listDocuments(
      database,
      shipmentHistoryCollection,
      [Query.equal("shipmentId", shipmentId)]
    );
    return shipmentHistorySchema.array().parse(historyRef.documents) ;
  }
  