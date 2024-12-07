import { shipmentHistoryT, shipmentSchema, shipmentT, userT } from "@/types/schemas";
import { db, getImageUrl, getUserById } from "../appwrite";
import { database, shipmentCollection, shipmentHistoryCollection } from "../contants";
import { ID, Query } from "appwrite";
import { shipmentWithHistoryT } from "@/types/types";
import { stripOutAppwriteMetaData } from "..";

function prepareShipmentForDb(shipment:shipmentT) {
  shipment.extras && delete shipment.extras
  return stripOutAppwriteMetaData(shipmentSchema.omit({$id:true}).parse(shipment))

}

export async function addShipment(shipment:shipmentT) {
    const id = ID.unique()
    await db.createDocument(database, shipmentCollection, id, prepareShipmentForDb(shipment));
    const shipmentHistory: Omit< shipmentHistoryT, "$id"> = {
      currentLocation: shipment.origin,
      currentLat: shipment.originLat,
      currentLong: shipment.originLong,
      status: "Registered",
      date: shipment.pickupDate,
      shipmentId:id,
    };
    await addShipmentHistory(shipmentHistory)
    return id
}
export async function addShipmentHistory(shipmentHistory:Omit<shipmentHistoryT, "$id" >) {
    const id = ID.unique()
    const {$id} =  await db.createDocument(database, shipmentHistoryCollection, id, shipmentHistory);
    return $id
}

export async function updateShipment(id:string, shipment:Omit<shipmentT, "$id">) {
    if (shipment.extras) {
        delete shipment.extras
    }
   await db.updateDocument(database, shipmentCollection, id, shipment);
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
          histories:await getHistory(shipment.$id),
          imageUrl:getImageUrl(shipment.image),
          courierInfo: await getUserById(shipment.courier),
          receiverInfo: await getUserById(shipment.receiver),
        }
    }
    return shipments;
  }
  
  export async function getHistory(shipmentId: string) {
    const historyRef = await db.listDocuments(
      database,
      shipmentHistoryCollection,
      [Query.equal("shipmentId", shipmentId)]
    );
    //@ts-ignore
    return historyRef.documents as (shipmentHistoryT & { $id: string })[];
  }
  