import Guest from "./guest.entity";

export default interface Reservation {
  guest: Guest;
  dateIn: string;
  dateOut: string;
  rates: any;
  roomType: string;
  status: string;
  paymentStatus: string;
  confirmation: string;
}
