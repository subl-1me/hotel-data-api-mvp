import sqlite3 from "sqlite3";
import { RepositoryFactory, DatabaseType } from "../database/repositories";
import { getDatabaseConfig } from "../config/database.config";

// services
import GuestService from "../../application/services/guest.service";
import ReservationService from "../../application/services/reservation.service";

export class Container {
  private static instance: Container;
  private repositories: Map<string, any> = new Map();
  private services: Map<string, any> = new Map();
  private connection: any;

  private constructor() {}

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  async initialize() {
    return new Promise((resolve, reject) => {
      console.log("Initializing database using the following configuration:\n");
      const config = getDatabaseConfig();
      console.log(config.type.toUpperCase());
      console.log(config.connection.filename);

      switch (config.type) {
        case DatabaseType.SQLITE:
          console.log("\nStarting test database...");
          this.connection = new sqlite3.Database(
            config.connection.filename || ":memory:"
          );
          break;
      }

      this.registerRepositories(config.type);
      this.registerServices();
      resolve(null);
    });
  }

  private registerRepositories(dbType: DatabaseType) {
    // Register all repositories
    const userRepo = RepositoryFactory.createGuestRepository(
      dbType,
      this.connection
    );
    this.repositories.set("GuestRepository", userRepo);

    const reservationRepo = RepositoryFactory.createReservationRepository(
      dbType,
      this.connection
    );
    this.repositories.set("ReservationRepository", reservationRepo);
  }

  private registerServices() {
    // get repos
    const userRepo = this.repositories.get("GuestRepository");
    const reservationRepo = this.repositories.get("ReservationRepository");

    // setup services
    const guestRepository = new GuestService(userRepo);
    const reservationRepository = new ReservationService(reservationRepo);

    // register services
    this.services.set("GuestService", guestRepository);
    this.services.set("ReservationService", reservationRepository);
  }

  // get instances
  get<T>(key: string): T {
    const instance = this.services.get(key) || this.repositories.get(key);
    if (!instance) {
      throw new Error(`Dependency ${key} not found in container`);
    }
    return instance;
  }

  // close connenctions
  async shutdown() {
    if (this.connection) {
      if (this.connection.end) {
        await this.connection.end(); // PostgreSQL
      } else {
        this.connection.close(); // SQLite
      }
    }
  }
}
