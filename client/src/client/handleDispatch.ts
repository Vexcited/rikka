import type DiscordBotClient from "../client/Discord.js";
import type { OpCodeDispatch } from "../types/OpCodes.js";
import type {
  EventReadyData,
  EventMessageCreateData,
  EventMessageReactionAddData,
  EventMessageReactionRemoveData
} from "../types/GatewayEvents.js";

// Import every events.
import handle_message_create from "../events/messageCreate.js";
import handle_ready from "../events/ready.js";
import handle_message_reaction_add from "../events/messageReactionAdd.js";
import handle_message_reaction_remove from "../events/messageReactionRemove.js";

// Dispatch the events and execute the handler.
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
  case "MESSAGE_REACTION_ADD":
    handle_message_reaction_add(message.d as EventMessageReactionAddData, client);
    break;
  case "MESSAGE_REACTION_REMOVE":
    handle_message_reaction_remove(message.d as EventMessageReactionRemoveData, client);
    break;
  default:
    console.debug("Not handled gateway event !", message);
  }
}
