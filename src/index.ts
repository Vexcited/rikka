import * as dotenv from "dotenv";
import mongoose from "mongoose";
import DiscordBotClient from "./client/Discord.js";
dotenv.config();

const DISCORD_TOKEN = process.env.NODE_ENV === "production"
  ? process.env.PROD_DISCORD_TOKEN
  : process.env.DEV_DISCORD_TOKEN;

if (!DISCORD_TOKEN) {
  throw new Error(`'${process.env.NODE_ENV === "production" ? "PROD" : "DEV"}_DISCORD_TOKEN' environment variable is not set in the '.env' file.`);
}

const MONGODB_URI = process.env.NODE_ENV === "production"
  ? "mongodb://mongodb:27017/rikka"
  : process.env.DEV_MONGODB_URI;

// This can only happen in development mode.
if (!MONGODB_URI) {
  throw new Error("'DEV_MONGODB_URI' environment variable is missing.");
}

// Connect to database.
await mongoose.connect(MONGODB_URI).catch(err => {
  console.error("Error while connecting to MongoDB.", err);
});

// Create the client.
new DiscordBotClient(DISCORD_TOKEN);
