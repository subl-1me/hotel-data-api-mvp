import Guest from "../../domain/entities/guest.entity";
import { IGuestRepository } from "../../domain/repositories/guest.repository.interface";

export default class GuestService {
  constructor(private guestRepository: IGuestRepository) {}

  async createGuest(guest: Guest) {
    return await this.guestRepository.create(guest);
  }
}
