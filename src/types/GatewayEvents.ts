import type { OpCodeDispatch } from "./OpCodes.js";

export interface EventReadyData extends OpCodeDispatch {
  /** Gateway version. */
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

  /** Guilds the bot is in. */
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

export interface EventMessageCreateData extends OpCodeDispatch {
  
}