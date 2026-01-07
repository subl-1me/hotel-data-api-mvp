// Server.ts
import express, { Application } from "express";
import cors from "cors";
import ServerConfig from "./shared/interfaces/ServerConfig";
import { Container } from "./infrastructure/container/container";
import { createGuestRoutes } from "./api/routes/guest.routes";
import { createReservationRoutes } from "./api/routes/reservation.routes";

export default class Server {
  public app: Application;
  public serverConfig: ServerConfig;
  private container?: Container;

  constructor(serverConfig: ServerConfig) {
    this.app = express();
    this.serverConfig = serverConfig;
    this.container = serverConfig.container;
    this.middlewares();
    this.configureRoutes();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private configureRoutes() {
    if (!this.container) {
      throw new Error("Container not initialized before configuring routes");
    }

    this.app.use("/api/guests", createGuestRoutes(this.container));
    this.app.use("/api/reservations", createReservationRoutes(this.container));
  }

  public start() {
    console.log("Starting server...");
    this.app.listen(this.serverConfig.port, (err) => {
      if (err) {
        console.log(`Error starting server: ${err}`);
        return;
      }

      console.log("\n=====================================".repeat(5));
      console.log(
        `\nHotel AI Assistant ~ Reservation & Customer Data Consulting Service`
      );
      console.log(
        `Server running on: http://localhost:${this.serverConfig.port}`
      );
      console.log("\n=====================================".repeat(5));
    });
  }
}
