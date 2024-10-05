import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import createConnectionHandler from "./db/connectionHandler";
import indexRouter from "./routes";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"]
}))
app.use(express.json());

app.listen(8000, '0.0.0.0', () => {
  console.log("Server running at port 8000");
  createConnectionHandler();
  app.use("/", indexRouter)
});