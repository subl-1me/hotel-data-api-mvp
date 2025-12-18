import { IGuestRepository } from "../../../domain/repositories/guest.repository.interface";
import Guest from "../../../domain/entities/guest.entity";
import { Database } from "sqlite3";

export class SqliteGuestRepository implements IGuestRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
    this.initTable();
  }

  private initTable(): void {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS guests (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        names TEXT NOT NULL,
        surnames TEXT NOT NULL,
        phone TEXT NOT NULL,
        reservations TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  async create(guest: Guest): Promise<Guest> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO guests (id, email, names, surnames, phone, reservations) VALUES (?, ?, ?, ?, ?, ?)",
        [
          guest.id,
          guest.email,
          guest.names,
          guest.surnames,
          guest.phone,
          JSON.stringify(guest.reservations), // object
        ],
        function (err) {
          if (err) reject(err);
          resolve(guest);
        }
      );
    });
  }
}
