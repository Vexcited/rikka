import * as dotenv from "dotenv";
import DiscordBotClient from "./client/Discord.js";

// Load environment variables from .env file.
dotenv.config();

// Check environment variables.
if (!process.env.DISCORD_TOKEN) {
  throw new Error("'DISCORD_TOKEN' environment variable is not set in the '.env' file.");
}

// Create the client.
new DiscordBotClient(process.env.DISCORD_TOKEN);