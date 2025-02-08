import { notificationT, shipmentHistorySchema, shipmentHistoryT, shipmentSchema, shipmentT, userT, withExtras } from "@/types/schemas";
import { addNewFile, addNotification, db, getImageUrl, getUserById, UpdateUser } from "../appwrite";
import { database, shipmentCollection, shipmentHistoryCollection } from "../contants";
import { ID, Query } from "appwrite";
import { shipmentWithHistoryT } from "@/types/types";
import { getLatLong, stripOutAppwriteMetaData } from "..";

function prepareShipmentForDb(shipment:Partial<shipmentT>) {
  shipment.extras && delete shipment.extras
  return stripOutAppwriteMetaData(shipmentSchema.partial().parse(shipment))
}

function prepareShipmentHistoryForDb(shipmentHistory:shipmentHistoryT) {
  return stripOutAppwriteMetaData(shipmentHistorySchema.partial().parse(shipmentHistory))
}

export async function addShipment(shipment:shipmentT) {
    shipment.$id = ""
    shipmentSchema.omit({$id:true}).parse(shipment)
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
    const user = shipment.extras?.courierInfo
    const receiver = shipment.extras?.receiverInfo
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
    shipment.$id = id
    await addShipmentHistory(shipment, shipmentHistory)
    if (user?.shipments && receiver?.shipments) {
      receiver.shipments.push(id);
      user.shipments.push(id);
      await UpdateUser({$id:receiver.$id, shipments:receiver.shipments});
      await UpdateUser({$id:user.$id, shipments:user.shipments});
    }
   
    const notification: notificationT = {
      $id: "",
      heading: "You have a new shipment",
      description: "You have a new shipment from " + shipment.shipperName,
      appEntity: "shipment",
      appEntityId: id,
    };
    const notificationId = await addNotification(notification);
    if (receiver?.notifications) {
      receiver.notifications.push(notificationId);
      await UpdateUser({$id:receiver.$id, notifications:receiver.notifications});
    }
    return id
}
export async function addShipmentHistory(shipment:shipmentT, shipmentHistory:shipmentHistoryT) {
    const id = ID.unique()
    shipmentHistory.shipmentId = shipment.$id
    const currentCords = await getLatLong(shipmentHistory.currentLocation);
      shipmentHistory.currentLat = currentCords.lat;
      shipmentHistory.currentLong = currentCords.lng;
    await db.createDocument(database, shipmentHistoryCollection, id, prepareShipmentHistoryForDb(shipmentHistory));
    if (shipment.histories) {
      shipment.histories.push(id)
    }
    else {
      shipment.histories = [id]
    }
    await updateShipment({
      $id:shipment.$id,
      histories:shipment.histories
    }, shipment)
    return id
}

export async function updateShipmentHistory(shipmentHistory:shipmentHistoryT, previewShipmentHistory:shipmentHistoryT) {
  if (shipmentHistory.currentLocation !== previewShipmentHistory.currentLocation) {
    const currentCords = await getLatLong(shipmentHistory.currentLocation);
    shipmentHistory.currentLat = currentCords.lat;
    shipmentHistory.currentLong = currentCords.lng;
  }
    const {$id} =  await db.updateDocument(database, shipmentHistoryCollection, shipmentHistory.$id, prepareShipmentHistoryForDb(shipmentHistory));
    return $id
}

export async function updateShipment(shipment:Partial<shipmentT> & {$id:string}, previousShipment: shipmentT) {
 if (shipment.pickupDate) {
   shipment.pickupDate = shipment.pickupDate.split("T")[0];
 }
 if (shipment.deliveryDate) {
   shipment.pickupDate = shipment.deliveryDate.split("T")[0];
 }
 if (shipment.quantity) {
   shipment.quantity = Number(shipment.quantity)
 }
 if (shipment.weight) {
   shipment.weight = Number(shipment.weight)
 }
  if (
    shipment.extras?.imageToUpload?.length
  ) {
   const imageId = await addNewFile(shipment.extras.imageToUpload[0])
    shipment.image = imageId;
  }
  
  if (shipment.origin && shipment.origin !== previousShipment.origin) {
    const originCords = await getLatLong(shipment.origin);
    shipment.originLat = originCords.lat;
    shipment.originLong = originCords.lng;
  }
  if (shipment.destination && shipment.destination !== previousShipment.destination) {
    const destinationCords = await getLatLong(shipment.destination);
    shipment.destinationLat = destinationCords.lat;
    shipment.destinationLong = destinationCords.lng;
  }
   await db.updateDocument(database, shipmentCollection, shipment.$id, prepareShipmentForDb(shipment));
}

export async function getShipmentExtras(shipment:shipmentT) {
  const extras = {
    histories:await getShipmentHistory(shipment.$id),
    imageUrl:shipment.image ?getImageUrl(shipment.image):undefined,
    courierInfo: await getUserById(shipment.courier),
    receiverInfo: await getUserById(shipment.receiver),
  }
  return extras
}

export async function getShipments(user: userT) {
  let shipments:shipmentT[] = []
  if (user.shipments?.length) {
    for(let shipmentId of user.shipments) {
      const shipment = await getShipment(shipmentId)
      shipments.push(shipment)
    }
    
  }

    return shipments;
  }
export async function getShipment(id:string) {
  const shipmentRef = await db.getDocument(database, shipmentCollection, id)
    const shipment:shipmentT = shipmentSchema.parse(shipmentRef)
    shipment.extras = await getShipmentExtras(shipment)
    return shipment;
  }
  
  export async function getShipmentHistory(shipmentId: string) {
    const historyRef = await db.listDocuments(
      database,
      shipmentHistoryCollection,
      [Query.equal("shipmentId", shipmentId)]
    );
    return shipmentHistorySchema.array().parse(historyRef.documents) ;
  }
  