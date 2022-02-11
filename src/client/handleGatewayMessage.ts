import type DiscordBotClient from "./Discord.js";
import type { DispatchOpCode } from "./handleDispatch.js";

import handleDispatch from "./handleDispatch.js";

export interface GatewayMessageCommon {
  /** OP codes from <https://discord.com/developers/docs/topics/opcodes-and-status-codes#gateway-gateway-opcodes>. */
  op:
    | 0 // Dispatch
    | 1 // Heartbeat
    | 2 // Identify
    | 3 // Presence Update
    | 4 // Voice State Update
    | 6 // Resume
    | 7 // Reconnect
    | 8 // Request Guild Members
    | 9 // Invalid Session
    | 10 // Hello
    | 11; // Heartbeat ACK
}

export interface InvalidSessionOpCode extends GatewayMessageCommon {
  op: 9;
  /**
   * `true` if the session is resumable.
   * `false` if the session is not resumable and should reconnect.
   */
  d: boolean;
}

export interface HelloOpCode extends GatewayMessageCommon {
  op: 10;
  d: {
    heartbeat_interval: number;
  }
}

/** Response of Heartbeat (1) when it's successful. */
export interface HeartbeatAckOpCode extends GatewayMessageCommon {
  op: 11;
}

export default function handleGatewayMessage (
  message:
    | DispatchOpCode
    | InvalidSessionOpCode
    | HelloOpCode
    | HeartbeatAckOpCode,
  client: DiscordBotClient
) {
  switch (message.op) {
  case 0:
    handleDispatch(message, client);
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