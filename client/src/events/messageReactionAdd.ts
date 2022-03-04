import type { EventMessageReactionAddData } from "../types/GatewayEvents.js";
import type DiscordBotClient from "../client/Discord.js";

export default async function handle_message_reaction_add (
  message_data: EventMessageReactionAddData,
  client: DiscordBotClient
) {
  console.info("Add role " + message_data.emoji.id + " for " + message_data.user_id);
}
