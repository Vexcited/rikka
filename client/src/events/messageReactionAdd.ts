import type { EventMessageReactionAddData } from "../types/GatewayEvents.js";
import type DiscordBotClient from "../client/Discord.js";

import { getGuild } from "../utils/databaseUtilities.js";

export default async function handle_message_reaction_add (
  message_data: EventMessageReactionAddData,
  client: DiscordBotClient
) {
  // Ignore all reaction events not coming from guilds.
  if (!message_data.guild_id) return;

  // Ignore reactions from bots.
  if (message_data.member?.user?.bot) return;

  const guild_data = await getGuild(message_data.guild_id);

  const emote_data = message_data.emoji;
  const reactionsFromMessageId = guild_data.reactions?.get(message_data.message_id);

  if (!reactionsFromMessageId) return;

  const emote_id = (emote_data.animated ? "a:" : "") + emote_data.name + (emote_data.id ? `:${emote_data.id}` : "");

  const role_id = reactionsFromMessageId.get(emote_id);
  const guild_id = message_data.guild_id;
  const user_id = message_data.user_id;

  try {
    await client.request_api.put(
      `guilds/${guild_id}/members/${user_id}/roles/${role_id}`
    );
  }
  catch (e) {
    console.error(e);
  }
}
