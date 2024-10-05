import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import createConnectionHandler from "./db/connectionHandler";
import indexRouter from "./routes";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["https://thriving-jalebi-92822e.netlify.app/"]
}))
app.use(express.json());

app.listen(Number(process.env.PORT), '0.0.0.0', () => {
  console.log("Server running at port " + Number(process.env.PORT));
  createConnectionHandler();
  app.use("/", indexRouter)
});