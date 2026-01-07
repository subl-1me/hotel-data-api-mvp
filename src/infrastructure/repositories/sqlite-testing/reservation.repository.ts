import { Database } from "sqlite3";
import Reservation from "../../../domain/entities/reservation.entity";
import { IReservationRepository } from "../../../domain/repositories/reservation.repository.interface";

export class SqliteReservationRepository implements IReservationRepository {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
    this.initTable();
  }

  private initTable(): void {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        reservationId TEXT NOT NULL,
        confirmation TEXT UNIQUE NOT NULL,
        guest TEXT NOT NULL,
        dateIn TEXT NOT NULL,
        dateOut TEXT NOT NULL,
        rates TEXT NOT NULL,
        roomType TEXT NOT NULL,
        status TEXT NOT NULL,
        paymentStatus TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (guest) REFERENCES Guest(guestId)
      )
    `);
  }

  async create(reservation: Reservation): Promise<Reservation> {
    return new Promise((resolve, reject) => {
      this.db.run(
        "INSERT INTO reservations (reservationId, confirmation, guest, dateIn, dateOut, rates, roomType, status, paymentStatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          reservation.reservationId,
          reservation.confirmation,
          reservation.guest,
          reservation.dateIn,
          reservation.dateOut,
          JSON.stringify(reservation.rates),
          reservation.roomType,
          reservation.status,
          reservation.paymentStatus,
        ],
        function (err) {
          if (err) reject(err);
          resolve(reservation);
        }
      );
    });
  }

  async update(
    id: string,
    reservation: Partial<Reservation>
  ): Promise<Reservation | null> {
    const fields = Object.keys(reservation)
      .map((key) => `${key} = ?`)
      .join(", ");

    const values = Object.values(reservation);
    return new Promise((resolve, reject) => {
      this.db.run(
        `UPDATE reservations SET ${fields} WHERE id = ?`,
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
      this.db.run(`DELETE FROM reservation WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        resolve(this.changes > 0);
      });
    });
  }

  async findAll(): Promise<Reservation[]> {
    return new Promise((resolve, reject) => {
      this.db.all(`SELECT  * FROM reservations`, [], function (err, rows) {
        if (err) reject(err);

        if (!rows || rows.length === 0) {
          resolve([]);
        }

        const reservations = rows.map((row: any) => {
          return {
            id: row.id,
            guest: row.guest,
            dateIn: row.dateIn,
            dateOut: row.dateOut,
            rates: JSON.parse(row.rates),
            roomType: row.roomType,
            status: row.status,
            paymentStatus: row.paymentStatus,
            confirmation: row.confirmation,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
          } as Reservation;
        });
        resolve(reservations);
      });
    });
  }

  async findByConfirmation(id: string): Promise<Reservation | null> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM reservations WHERE confirmation = ?`,
        [id],
        function (err, res) {
          if (err) reject(err);
          if (res.length === 0) {
            resolve(null);
          }

          resolve(res[0] as Reservation);
        }
      );
    });
  }

  async findById(id: string): Promise<Reservation | null> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM reservations WHERE reservationId = ?`,
        [id],
        function (err, res) {
          if (err) reject(err);
          if (res.length === 0) {
            resolve(null);
          }

          resolve(res[0] as Reservation);
        }
      );
    });
  }

  async findByGuestName(name: string): Promise<Reservation[] | null> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `
      SELECT r.* ,
      g.guestId as g_id,
      g.names as g_names,
      g.surnames as g_surnames,
      g.email as g_email,
      g.phone as g_phone
      FROM reservations r
      JOIN Guests g ON g.guestId = r.guest
      WHERE g.names LIKE ?
      `,
        [`%${name}%`],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows as Reservation[]);
        }
      );
    });
  }
}
