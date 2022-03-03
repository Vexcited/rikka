export interface Message {
  type: 
    | 0 // Message
    | 19 // Message w/reply.

  tts: boolean;
  timestamp: string; // Snowflake.

  referenced_message: null | Message;

  pinned: boolean;
  nonce: string;

  // Only on a reply.
  message_reference?: {
    message_id: string;
    guild_id: string;
    channel_id: string;
  };

  mentions: string[];
  mention_roles: string[];
  mention_everyone: boolean;

  member: {
    roles: string[],
    mute: boolean;
    joined_at: string;
    hoisted_role: string;
    deaf: boolean;
  };

  id: string;
  flags: number;

  embeds: any[];
  edited_timestamp: null | string;

  content: string;
  components: any[];
  channel_id: string;

  author: {
    username: string;
    public_flags: number;
    id: string;
    discriminator: string;
    avatar: string;
  };

  attachments: any[];
  guild_id: string;
}
