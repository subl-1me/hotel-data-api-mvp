import Guest from "../entities/guest.entity";

export interface IGuestRepository {
  findById(id: string): Promise<Guest | null>;
  findByName(email: string): Promise<Guest[] | null>;
  create(guest: Guest): Promise<Guest>;
  update(id: string, guest: Partial<Guest>): Promise<Guest | null>;
  delete(id: string): Promise<boolean>;
  findAll(): Promise<Guest[]>;
}
