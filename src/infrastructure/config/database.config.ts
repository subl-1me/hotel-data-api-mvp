import { DatabaseType } from "../database/repositories";

export interface DatabaseConfig {
  type: DatabaseType;
  connection: {
    filename?: string; // SQLite case testing
    host?: string;
    port?: number;
    database?: string;
    user?: string;
    password?: string;
  };
}

export const getDatabaseConfig = (): DatabaseConfig => {
  const env = process.env.NODE_ENV || "development";

  if (env === "test") {
    return {
      type: DatabaseType.SQLITE,
      connection: {
        filename: "./TEST_MVP_HOTEL_DB.sqlite",
      },
    };
  }

  return { type: DatabaseType.MEMORY, connection: {} };

  // PROD
  //   return {
  //     type: DatabaseType.POSTGRES,
  //     connection: {
  //       host: process.env.DB_HOST,
  //       port: parseInt(process.env.DB_PORT || "5432"),
  //       database: process.env.DB_NAME,
  //       user: process.env.DB_USER,
  //       password: process.env.DB_PASSWORD,
  //     },
  //   };
};
