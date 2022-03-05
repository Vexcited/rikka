import * as dotenv from "dotenv";
import mongoose from "mongoose";

import { startApiServer } from "./client/Api.js";
import DiscordBotClient from "./client/Discord.js";

// Load environment variables from .env file.
dotenv.config();

const DISCORD_TOKEN = process.env.NODE_ENV === "production"
  ? process.env.PROD_DISCORD_TOKEN
  : process.env.DEV_DISCORD_TOKEN;

if (!DISCORD_TOKEN) {
  const env_name = `${process.env.NODE_ENV === "production" ? "PROD" : "DEV"}_DISCORD_TOKEN`;
  throw new Error(`'${env_name}' environment variable is not set in the '.env' file.`);
}

const MONGODB_URI = process.env.NODE_ENV === "production"
  ? "mongodb://mongodb:27017/rikka"
  : process.env.DEV_MONGODB_URI;

// This can only happen in development mode.
if (!MONGODB_URI) {
  const env_name = "DEV_MONGODB_URI";
  throw new Error(`'${env_name}' environment variable is missing.`);
}

// Connect to database.
await mongoose.connect(MONGODB_URI).catch(err => {
  console.error("Error while connecting to MongoDB.");
  throw err;
});

// Create the client.
new DiscordBotClient(DISCORD_TOKEN);

// Create API server.
startApiServer();
