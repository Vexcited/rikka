import type { EventMessageCreateData } from "../types/GatewayEvents.js";
import type DiscordBotClient from "../client/Discord.js";

export default async function handle_message_create (
  message_data: EventMessageCreateData,
  client: DiscordBotClient
) {
  console.info(message_data);
}