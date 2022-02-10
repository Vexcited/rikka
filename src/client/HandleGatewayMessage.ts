import type DiscordBotClient from "./Discord.js";

interface GatewayMessageCommon {
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

export default function HandleGatewayMessage (
  message:
    | HelloOpCode
    | HeartbeatAckOpCode,
  client: DiscordBotClient
) {
  switch (message.op) {
  case 10:
    client.setup_heartbeat(message.d.heartbeat_interval);
    break;
  case 11:
    break;
  default:
    console.info("Unhandled message:", message);
  }
}