import type { EventMessageReactionRemoveData } from "../types/GatewayEvents.js";
import type DiscordBotClient from "../client/Discord.js";

import Message from "../utils/Message.js";

export default async function handle_message_reaction_remove (
  message_data: EventMessageReactionRemoveData,
  client: DiscordBotClient
) {
  console.info("Remove role " + message_data.emoji + " for " + message_data.user_id);
}
