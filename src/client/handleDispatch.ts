import type { GatewayMessageCommon } from "./handleGatewayMessage.js";
import type DiscordBotClient from "./Discord.js";

interface DispatchCommonMessage extends GatewayMessageCommon {
  op: 0;
}

export interface DispatchReadyMessage extends DispatchCommonMessage {
  t: "READY";
  s: number;
  op: 0;
  d: {
    v: number;

    user: {
      verified: boolean;
      username: string;
      mfa_enabled: boolean;
      /** Snowflake */
      id: string;
      flags: number;
      /** A bot don't have any e-mail address. */
      email: string | null;
      discriminator: string;
      bot: boolean;
      avatar: string;
    };

    guilds: {
      unavailable: boolean;
      id: string;
    }[];

    /** Used for resuming connections. */
    session_id: string;

    shard?: [shard_id: number, num_shards: number];

    application: {
      id: string;
      flags: number;
    };
  }
}

export type DispatchOpCode =
  | DispatchReadyMessage;

export default function handleDispatch (
  message: DispatchOpCode,
  client: DiscordBotClient
) {

  /**
   * Update current sequence with last sequence from message.
   */
  if (message.s) {
    client.bot_current_sequence = message.s;
    console.debug(`Updated 'bot_current_sequence' with ${message.s}`);
  }

  console.log(message);
  
  switch (message.t) {
    case "READY":
    client.bot_data = message.d;
  }
}