import type { EventReadyData } from "../types/GatewayEvents.js";
import type DiscordBotClient from "../client/Discord.js";

export default function handle_ready (
  message_data: EventReadyData,
  client: DiscordBotClient
) {
  client.bot_data = message_data;
  console.debug("Received 'READY' event, and updated inner bot data with it.");
}