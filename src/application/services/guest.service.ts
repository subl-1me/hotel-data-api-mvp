import Guest from "../../domain/entities/guest.entity";
import { IGuestRepository } from "../../domain/repositories/guest.repository.interface";

export default class GuestService {
  constructor(private guestRepository: IGuestRepository) {}

  async createGuest(guest: Guest) {
    return await this.guestRepository.create(guest);
  }

  async updateGuest(id: string, guest: Guest) {
    return await this.guestRepository.update(id, guest);
  }

  async deleteGuest(id: string) {
    return await this.guestRepository.delete(id);
  }

  async getGuestList() {
    return await this.guestRepository.findAll();
  }

  async getGuestById(id: string) {
    return await this.guestRepository.findById(id);
  }

  async getGuestByName(name: string) {
    return await this.guestRepository.findByName(name);
  }
}
