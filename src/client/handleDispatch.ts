import type { GatewayMessageCommon } from "./handleGatewayMessage.js";
import type DiscordBotClient from "./Discord.js";

interface DispatchCommonMessage extends GatewayMessageCommon {
  op: 0;
}

interface DispatchReadyMessage extends DispatchCommonMessage {
  t: "READY";
  d: {
    v: number;
    user: {

    };

    guilds: {

    }[];

    /** Used for resuming connections. */
    session_id: string;

    shard?: [shard_id: number, num_shards: number];

    application: {

    };
  }
}

export type DispatchOpCode =
  | DispatchReadyMessage;

export default function handleDispatch (
  message: DispatchOpCode,
  client: DiscordBotClient
) {
  switch (message.t) {
  case "READY":
    client.bot_data = message.d;
  }
}