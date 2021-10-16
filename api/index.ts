import app from "./src/server";
import dotenv from "dotenv";
import { setupConnection } from "./src/db/config";
import "reflect-metadata";

dotenv.config();

const port = process.env.PORT;

setupConnection();
app.listen(port, async () => {
  console.log(`This beautiful and updated server is running on port ${port}`);
});
