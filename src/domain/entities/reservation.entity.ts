import Guest from "./guest.entity";

export default interface Reservation {
  id: string;
  reservationId: string;
  guest: Guest | string;
  dateIn: string;
  dateOut: string;
  rates: any;
  roomType: string;
  status: string;
  paymentStatus: string;
  confirmation: string;
  createdAt: string;
  updatedAt: string;
}
