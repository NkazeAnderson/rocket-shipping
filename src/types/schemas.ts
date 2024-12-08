import { z } from "zod";



export const statusSchema = z.enum(["Registered","Picked Up","Out for Delivery","In Transit","On Hold","Cancelled","Delivered"])
export const transportModeSchema = z.enum([ "Air Freight","Land Transport","Rail Transport","Ship Transport"])
export const packagingSchema = z.enum(["Crate","Pallet","Carton","Envelope"])
export const paymentMethodSchema = z.enum([ "Cash","Zelle","Apple Pay","Gift Card","Cashapp","Paypal","Google Pay","Credit Card","Bank"])
export const actionSchema = z.enum(["Insurance","Crate change","None","Clearance","Accommodation","Change of state","City permit","Crate fee","Delivery fee","Smoke test","Insurance renewal","Step up Insurance"])

export const userSchema = z.object({
  $id:z.string(),
  name: z.string(),
  email: z.string(),
  phone:  z.string().or(z.null()).optional(),
  access:  z.string().or(z.null()).optional(),
  image:  z.string().or(z.null()).optional(),
  isAdmin: z.boolean().or(z.null()).optional()   
})
export const  locationSchema = z.object( {
  street: z.string(),
  cityStateCountry: z.string(),
  zip: z.string(),
})

export const shipmentSchema = z.object({
  $id:z.string(),
  shipperName: z.string(),
  shipperEmail: z.string(),
  origin: z.string(),
  originLat: z.number().or(z.null()).optional(),
  originLong: z.number().or(z.null()).optional(),
  destination: z.string(),
  destinationLat: z.number().or(z.null()).optional(),
  destinationLong: z.number().or(z.null()).optional(),
  receiver: z.string(), 
  courier: z.string(),
  pickupDate: z.string(),
  deliveryDate: z.string(),
  eta: z.string(),
  product: z.string(),
  mode: transportModeSchema,
  paymentMethod: paymentMethodSchema,
  quantity: z.number(),
  weight: z.number(),
  image: z.string(),
  package: packagingSchema,
  action: actionSchema.or(z.null()).optional(),
  conversationId: z.string().or(z.null()).optional()
})

export const shipmentHistorySchema = z.object({
  $id:z.string(),
  date: z.string(),
  currentLocation: z.string(),
  currentLat: z.number().or(z.null()).optional(),
  currentLong: z.number().or(z.null()).optional(),
  status: statusSchema,
  shipmentId: z.string(),
})

export const conversationSchema = z.object({
  $id:z.string(),
  member1: z.string(),
  member2: z.string(),
  lastMessageId: z.string().or(z.literal("shipping-img-new")) .or(z.null()).optional(),
})

export const messageSchema = z.object(
  {
    $id:z.string(),
    sender: z.string(),
    text: z.string().or(z.null()).optional(),
    read: z.boolean().or(z.null()).optional(),
    image: z.string().or(z.null()).optional(),
    conversationId: z.string(),
    timeStamp: z.number(),
  }
) 

type imageExtras= {imageToUpload?:FileList, imageUrl?:string}
export type userT = z.infer<typeof userSchema> & {extras?:imageExtras}
export type shipmentHistoryT = z.infer<typeof shipmentHistorySchema>
export type shipmentT = z.infer<typeof shipmentSchema> & { extras? : { courierInfo?: userT, receiverInfo?:userT, histories?:shipmentHistoryT[]}&imageExtras}
export type messageT = z.infer<typeof messageSchema> & {extras?: {imageUrl?:string}}
export type conversationT = z.infer<typeof conversationSchema> & {extras?: { messages:messageT[], member1Info:userT, member2Info:userT} } 
