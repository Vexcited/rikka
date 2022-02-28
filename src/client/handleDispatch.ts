import type DiscordBotClient from "../client/Discord.js";
import type { OpCodeDispatch } from "../types/OpCodes.js";
import type {
  EventReadyData,
  EventMessageCreateData
} from "../types/GatewayEvents.js";

import handle_message_create from "../events/messageCreate.js";
import handle_ready from "../events/ready.js";

export default function handleDispatch (
  message: OpCodeDispatch,
  client: DiscordBotClient
) {
  /** Update current sequence with last sequence from message. */
  if (message.s) {
    client.bot_current_sequence = message.s;
    console.debug(`Updated 'bot_current_sequence' with ${message.s}.`);
  }

  switch (message.t) {
    case "READY":
      handle_ready(message.d as EventReadyData, client);
      break;
    case "MESSAGE_CREATE":
      handle_message_create(message.d as EventMessageCreateData, client);
      break;
    default:
      console.debug(message);
  }
}
