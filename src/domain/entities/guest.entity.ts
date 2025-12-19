import Reservation from "./reservation.entity";

export default interface Guest {
  id: string;
  names: string;
  surnames: string;
  email: string;
  phone: string;
  reservations: Reservation[];
  createdAt: Date;
  updatedAt: Date;
}
