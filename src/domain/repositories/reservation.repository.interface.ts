import Reservation from "../entities/reservation.entity";

export interface IReservationRepository {
  findByConfirmation(id: string): Promise<Reservation | null>;
  findByGuestName(name: string): Promise<Reservation[] | null>;
  findById(id: string): Promise<Reservation | null>;
  create(reservation: Reservation): Promise<Reservation>;
  update(id: string, guest: Partial<Reservation>): Promise<Reservation | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Reservation[]>;
}
