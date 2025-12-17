import Server from "./server";
import dotenv from "dotenv";
dotenv.config();

const main = () => {
  console.log("Starting reservation service...");
  const PORT = Number(process.env.PORT || 5005);
  const server = new Server({ port: PORT }).start();
};

main();
