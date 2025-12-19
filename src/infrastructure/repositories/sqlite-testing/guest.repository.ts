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

  async update(id: string, guest: Partial<Guest>): Promise<Guest | null> {
    const fields = Object.keys(guest)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(guest);
    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE guests SET ${fields} WHERE id = ?`,
        [...values, id],
        function (err) {
          if (err) reject(err);
          resolve(null);
        }
      );
    });
  }

  async delete(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM guests WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        resolve(this.changes > 0);
      });
    });
  }

  async findAll(): Promise<Guest[]> {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT  * FROM guests`, [], function (err, rows) {
        if (err) reject(err);

        if (!rows || rows.length === 0) {
          resolve([]);
        }

        const guests = rows.map((row: any) => {
          return {
            id: row.id,
            email: row.email,
            names: row.names,
            surnames: row.surnames,
            phone: row.phone,
            reservations: row.reservations,
            updatedAt: row.updatedAt,
            createdAt: row.createdAt,
          } as Guest;
        });
        resolve(guests);
      });
    });
  }

  async findById(id: string): Promise<Guest | null> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM guests WHERE id = ?`,
        [id],
        function (err, res) {
          if (err) reject(err);
          if (res.length === 0) {
            resolve(null);
          }

          resolve(res[0] as Guest);
        }
      );
    });
  }

  async findByName(names: string): Promise<Guest[] | null> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM guests WHERE names = ?`,
        [names],
        function (err, rows) {
          if (err) reject(err);
          resolve(rows as Guest[]);
        }
      );
    });
  }
}
