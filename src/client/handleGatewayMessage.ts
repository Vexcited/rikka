import type DiscordBotClient from "./Discord.js";
import type {
  OpCodeDispatch,
  OpCodeHeartbeatAck,
  OpCodeHello,
  OpCodeInvalidSession,
  OpCodeReconnect
} from "../types/OpCodes.js";

import handleDispatch from "./handleDispatch.js";

export default function handleGatewayMessage (
  message:
    | OpCodeDispatch
    | OpCodeHeartbeatAck
    | OpCodeHello
    | OpCodeInvalidSession
    | OpCodeReconnect
  ,
  client: DiscordBotClient
) {
  switch (message.op) {
  case 0: {
    handleDispatch(message as OpCodeDispatch, client);
    break;
  }
  // Reconnect
  case 7:
    // Reconnect by resuming, if resuming isn't
    // successful, it will throw "Invalid Session" (9).
    client.send_resume_message();
    break;
  // Invalid Session
  case 9:
    // Session may not be resumable -> reconnect.
    if (!message.d) client.send_identify_message();
    else client.send_resume_message();
    break;
  // Hello.
  case 10:
    // Setup Heartbeat.
    client.setup_heartbeat(message.d.heartbeat_interval);
    // Identify client.
    client.send_identify_message();
    break;
  case 11:
    console.debug("Heartbeat ACK received.", message);
    break;
  default:
    console.error("Unhandled message:", message);
  }
}