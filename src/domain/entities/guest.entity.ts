import Reservation from "./reservation.entity";

export default interface Guest {
  id: string;
  guestId: string;
  names: string;
  surnames: string;
  email: string;
  phone: string;
  reservations: any;
  createdAt: Date;
  updatedAt: Date;
}
