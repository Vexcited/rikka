import type { EventMessageCreateData } from "../types/GatewayEvents.js";
import type DiscordBotClient from "../client/Discord.js";

import Message from "../utils/Message.js";

export default async function handle_message_create (
  message_data: EventMessageCreateData,
  client: DiscordBotClient
) {
  const message = new Message(message_data, client);

  const prefix = "=>";
  if (!message.raw.content.startsWith(prefix)) return;

  const args = message.raw.content.slice(prefix.length).trim().split(" ");
  const commandName = args.shift();
  if (!commandName) return;

  // Check if command exists.
  if (!client.messageCommands[commandName]) return;

  await client.messageCommands[commandName](message, args);
}
