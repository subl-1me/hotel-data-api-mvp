import Server from "./server";
import dotenv from "dotenv";
import { Container } from "./infrastructure/container/container";
dotenv.config();

async function main() {
  try {
    console.log("Starting reservation service...");

    // repo container
    console.log("before init container");
    const container = Container.getInstance();
    console.log(container);
    await container.initialize();

    console.log("after init container");
    console.log(container);

    const PORT = Number(process.env.PORT || 5005);
    const server = new Server({ port: PORT, container }).start();
  } catch (err) {
    console.log("Failed to start server: ", err);
    process.exit(1);
  }
}

main();
