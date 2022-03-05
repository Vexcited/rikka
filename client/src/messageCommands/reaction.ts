import type { MessageCommandType } from "./index.js";
import { getGuild } from "../utils/databaseUtilities.js";
import { MessageTypes } from "../types/DiscordApi.js";

/**
 * Note: works only with a "REPLY" (19).
 * Usage: Reply to any message with this command (PREFIX + "reaction EMOTE ROLE")
 *
 * EMOTE can be ID or the emote directly.
 * ROLE can be ID or a mention.
 */
const reaction: MessageCommandType = async (message, args) => {
  // Check if it's a reply and the message still exists.
  if (message.raw.type !== MessageTypes.REPLY || !message.raw.message_reference?.message_id) return;
  // Check if the message is in a guild.
  if (!message.raw.guild_id) return;

  const emote = args.shift();
  const role_id = message.raw.mention_roles[0] || args.shift()?.replace(/[<@&>]/, "") || "";

  if (!emote && !role_id) {
    await message.reply("You need to pass an **emote** and a **role** to arguments.");
    return;
  }

  if (!emote) {
    await message.reply("You need to pass an **emote**.");
    return;
  }

  if (!emote) {
    await message.reply("You need to pass a **role**.");
    return;
  }

  // Get the emote identifier to use them.
  // Example for custom emotes: "custom:EMOTE_ID" or "a:custom:EMOTE_ID".
  // When using unicode emote, it's just the unicode.
  const emote_id = emote
    // Remove "<" and ">" at the beginning and end.
    .replace(/[<>]/gi, "")
    // Remove first ":" if it's a custom emote.
    .replace(/^:/, "");

  const guild_data = await getGuild(message.raw.guild_id);
  const reactions: typeof guild_data["reactions"] = guild_data.reactions ?? new Map();

  const referencedMessageId = message.raw.message_reference.message_id;
  const reactionsReferencedMessage: Map<string, string> = reactions.get(referencedMessageId) ?? new Map();

  // Add the reaction->role to the message.
  reactionsReferencedMessage.set(emote_id, role_id);
  reactions.set(referencedMessageId, reactionsReferencedMessage);

  // Add the reaction to the referenced message.
  await message.react(emote_id, { toReferenced: true });

  // Save the new reactions for the guild into database.
  await guild_data.updateOne({ reactions });
};

export default reaction;
