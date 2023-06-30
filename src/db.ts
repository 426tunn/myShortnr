import mongoose from "mongoose";
import dotenv from "dotenv";
import { Config } from './envConfig/config';
import logger from "./Logger/logger";

dotenv.config();
const DBURL: string = Config.DBURL;

export const connectDB = (): void => {
  mongoose.connect(DBURL); 

  const DBConnection = mongoose.connection

  DBConnection.on("connected", () => {
    logger.info("mongoose connected");
  });

  DBConnection.on("error", (error) => {
    logger.error("mongoose connection error:", error);
  });
};
