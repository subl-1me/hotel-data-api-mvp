import Reservation from "../../domain/entities/reservation.entity";
import { IReservationRepository } from "../../domain/repositories/reservation.repository.interface";

export default class ReservationService {
  constructor(private reservationRepository: IReservationRepository) {}

  async createReservation(reservation: Reservation) {
    return await this.reservationRepository.create(reservation);
  }

  async updateReservation(id: string, reservation: Reservation) {
    return await this.reservationRepository.update(id, reservation);
  }

  async deleteReservation(id: string) {
    return await this.reservationRepository.delete(id);
  }

  async getReservationList() {
    return await this.reservationRepository.findAll();
  }

  async getReservationById(id: string) {
    return await this.reservationRepository.findById(id);
  }

  async getReservationByConfirmation(id: string) {
    return await this.reservationRepository.findByConfirmation(id);
  }

  async getReservationByGuestName(name: string) {
    return await this.reservationRepository.findByGuestName(name);
  }
}
