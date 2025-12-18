import Server from "./server";
import dotenv from "dotenv";
import { Container } from "./infrastructure/container/container";
dotenv.config();

async function main() {
  try {
    console.log("Starting reservation service...");

    // repo container
    const container = Container.getInstance();
    await container.initialize();

    const PORT = Number(process.env.PORT || 5005);
    const server = new Server({ port: PORT, container }).start();
  } catch (err) {
    console.log("Failed to start server: ", err);
    process.exit(1);
  }
}

main();
