import * as dotenv from "dotenv";
import DiscordBotClient from "./client/Discord.js";

// Load environment variables from .env file.
dotenv.config();

// Create the client.
new DiscordBotClient("token");