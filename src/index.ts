import * as dotenv from "dotenv";
import DiscordBotClient from "./client/Discord.js";
dotenv.config();

const DISCORD_TOKEN = process.env.NODE_ENV === "production"
  ? process.env.PROD_DISCORD_TOKEN
  : process.env.DEV_DISCORD_TOKEN;

// Check environment variables.
if (!DISCORD_TOKEN) {
  throw new Error(`'${process.env.NODE_ENV === "production" ? "PROD" : "DEV"}_DISCORD_TOKEN' environment variable is not set in the '.env' file.`);
}

// Create the client.
new DiscordBotClient(DISCORD_TOKEN);
