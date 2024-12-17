import { z } from "zod";

export const statusSchema = z.enum(["Registered","Picked Up","Out for Delivery","In Transit","On Hold","Cancelled","Delivered"])
export const transportModeSchema = z.enum([ "Air Freight","Land Transport","Rail Transport","Ship Transport"])
export const packagingSchema = z.enum(["Crate","Pallet","Carton","Envelope"])
export const paymentMethodSchema = z.enum([ "Cash","Zelle","Apple Pay","Gift Card","Cashapp","Paypal","Google Pay","Credit Card","Bank"])
export const actionSchema = z.enum(["Insurance","Crate change","None","Clearance","Accommodation","Change of state","City permit","Crate fee","Delivery fee","Smoke test","Insurance renewal","Step up Insurance"])
export const appEntitiesSchema = z.enum(["shipment" , "notification" , "conversation" , "admin"])
export const userSchema = z.object({
  $id:z.string(),
  name: z.string(),
  email: z.string().email(),
  phone:  z.string().nullish(),
  access:  z.string().nullish(),
  image:  z.string().nullish(),
  isAdmin: z.boolean().nullish(), 
  conversations:z.string().array().nullish(),
  notifications:z.string().array().nullish(),
  shipments: z.string().array().nullish()
})
export const  locationSchema = z.object( {
  street: z.string(),
  cityStateCountry: z.string(),
  zip: z.string(),
})

export const shipmentSchema = z.object({
  $id:z.string(),
  shipperName: z.string(),
  shipperEmail: z.string().email(),
  origin: z.string(),
  originLat: z.coerce.number().nullish(),
  originLong: z.coerce.number().nullish(),
  destination: z.string(),
  destinationLat: z.coerce.number().nullish(),
  destinationLong: z.coerce.number().nullish(),
  receiver: z.string(), 
  courier: z.string(),
  pickupDate: z.string(),
  deliveryDate: z.string(),
  eta: z.string(),
  product: z.string(),
  mode: transportModeSchema,
  paymentMethod: paymentMethodSchema,
  quantity: z.coerce.number(),
  weight: z.coerce.number(),
  image: z.string().nullish(),
  package: packagingSchema,
  action: actionSchema.nullish(),
  conversationId: z.string().nullish(),
  histories:z.string().array().optional()
})

export const shipmentHistorySchema = z.object({
  $id:z.string(),
  date: z.string(),
  currentLocation: z.string(),
  currentLat: z.coerce.number().nullish(),
  currentLong: z.coerce.number().nullish(),
  status: statusSchema,
  shipmentId: z.string(),
})

export const conversationSchema = z.object({
  $id:z.string(),
  member1: z.string(),
  member2: z.string(),
  lastMessageId: z.string().or(z.literal("shipping-img-new")) .nullish(),
})

export const messageSchema = z.object(
  {
    $id:z.string(),
    sender: z.string(),
    text: z.string().nullish(),
    read: z.boolean().nullish(),
    image: z.string().nullish(),
    conversationId: z.string(),
    timeStamp: z.coerce.number(),
  }
) 

export const notificationSchema = z.object({
  $id: z.string(),
  heading: z.string(),
  description: z.string(),
  appEntityId: z.string(),
  appEntity: appEntitiesSchema.exclude(["admin","notification"]),
  action: z.string().nullish(),
  viewed:z.boolean().nullish()
})

type imageExtras= {imageToUpload?:FileList, imageUrl?:string}
export type userT = z.infer<typeof userSchema> & {extras?:imageExtras}
export type shipmentHistoryT = z.infer<typeof shipmentHistorySchema>
export type shipmentT = z.infer<typeof shipmentSchema> & { extras? : { courierInfo: userT, receiverInfo:userT, histories:shipmentHistoryT[]}&imageExtras}
export type messageT = z.infer<typeof messageSchema> & {extras?: {imageUrl?:string}}
export type conversationT = z.infer<typeof conversationSchema> & {extras?: { messages:messageT[], member1Info:userT, member2Info:userT} } 
export type notificationT = z.infer<typeof notificationSchema>  
export type withExtras<T extends {extras?:Record<string, any>}> = Required<Pick<T, "extras">> &  Omit<T, "extras">