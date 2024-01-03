import mongoose from "mongoose";
import { MONOGO_URI } from "../config.js";

export const connectDB = () => {
  mongoose.connect(MONOGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("database connected successfully");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting with database", err);
  });
};
