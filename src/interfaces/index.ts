import { StatusType } from "@/lib/constants";
import { ElementType, ReactNode } from "react";

// export type ProfileTabName = 'Compliance' | 'Reviews' | 'Bookings' | 'Referrals' | 'Payments' | 'Notifications' | 'Subscriptions' | 'Community' | 'Traces'
export type TTabs<T> = Map<T, ElementType>;

export interface IProduct {
  id: string;
  title: string;
  price: string;
  image: string;
  status: StatusType;
  createdAt: string;
  category: string;
}
