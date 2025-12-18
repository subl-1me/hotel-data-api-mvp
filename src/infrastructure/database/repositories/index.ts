import { IGuestRepository } from "../../../domain/repositories/guest.repository.interface";
import { SqliteGuestRepository } from "../../repositories/sqlite-testing/guest.repository";

export enum DatabaseType {
  SQLITE = "sqlite", // for MVP use case testing
  MEMORY = "memory",
}

export class RepositoryFactory {
  static createGuestRepository(
    type: DatabaseType,
    connection?: any
  ): IGuestRepository {
    switch (type) {
      case DatabaseType.SQLITE:
        return new SqliteGuestRepository(connection);
      default:
        throw new Error(`Unsupported database type: ${type}`);
    }
  }
}
