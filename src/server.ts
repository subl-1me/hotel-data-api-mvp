// Server.ts
import express, { Application } from "express";
import cors from "cors";
import ServerConfig from "./interfaces/ServerConfig";

export default class Server {
  public app: Application;
  public serverConfig: ServerConfig;

  constructor(serverConfig: ServerConfig) {
    this.app = express();
    this.middlewares();
    this.routes();
    this.serverConfig = serverConfig;
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    // this.app.use("/api/users", usersRoutes);
  }

  public start() {
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
