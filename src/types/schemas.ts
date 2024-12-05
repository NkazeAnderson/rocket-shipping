import { z } from "zod";

export const userSchema = z.object({
    $id:z.string(),
    name: z.string(),
    email: z.string(),
    phone:  z.string().optional(),
    access:  z.string().optional(),
    image:  z.string().optional(),
    isAdmin: z.boolean().optional()   
})
export const  locationSchema = z.object( {
    street: z.string(),
    cityStateCountry: z.string(),
    zip: z.string(),
  })

export const statusSchema = z.enum(["Registered","Picked Up","Out for Delivery","In Transit","On Hold","Cancelled","Delivered"])
export const transportModeSchema = z.enum([ "Air Freight","Land Transport","Rail Transport","Ship Transport"])
export const packagingSchema = z.enum(["Crate","Pallet","Carton","Envelope"])
export const paymentMethodSchema = z.enum([ "Cash","Zelle","Apple Pay","Gift Card","Cashapp","Paypal","Google Pay","Credit Card","Bank"])
export const actionSchema = z.enum(["Insurance","Crate change","None","Clearance","Accommodation","Change of state","City permit","Crate fee","Delivery fee","Smoke test","Insurance renewal","Step up Insurance"])

export const shipmentSchema = z.object({
    shipperName: z.string(),
  shipperEmail: z.string(),
  origin: z.string(),
  originLat: z.number().optional(),
  originLong: z.number().optional(),
  destination: z.string(),
  destinationLat: z.number().optional(),
  destinationLong: z.number().optional(),
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
  action: actionSchema.optional(),
  conversationId: z.string().optional()
})

export const shipmentHistorySchema = z.object({
    date: z.string(),
    currentLocation: z.string(),
    currentLat: z.number().optional(),
    currentLong: z.number().optional(),
    status: statusSchema,
    shipmentId: z.string(),
})

export const conversationSchema = z.object({
        member1: z.string(),
        member2: z.string(),
        lastMessage: z.string().or(z.literal("shipping-img-new")) .optional()
})

export type userT = z.infer<typeof userSchema>