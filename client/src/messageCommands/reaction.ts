import type { MessageCommandType } from "./index.js";
import Guild from "../models/Guild.js";
import { getGuild } from "../utils/databaseUtilities.js";

/**
 * Note: works only with a "REPLY" (19).
 * Usage: Reply to any message with this command (PREFIX + "reaction EMOTE ROLE")
 *
 * EMOTE can be ID or the emote directly.
 * ROLE can be ID or a mention.
 */
const reaction: MessageCommandType = async (message, args) => {
  if (message.raw.type !== 19) return;

  const EMOTE = args.shift();
  const ROLE = args.shift();

  if (!EMOTE && !ROLE) {
    await message.reply("You need to pass EMOTE_ID and ROLE_ID to arguments.");
    return;
  }

  if (!EMOTE) {
    await message.reply("You need to pass EMOTE_ID.");
    return;
  }

  if (!ROLE) {
    await message.reply("You need to pass ROLE_ID.");
    return;
  }

  // Emote is the identifier to use them.
  // (eg.: ":sparkles:", or, ":custom:1234567890123:")
  const emote_id = EMOTE.trim();
  // ID of the role.
  // Remove "/[<@&>]/gi" to get ID from mention.
  const role_id = ROLE.replace(/[<@&>]/gi, "").trim();

  const guild_data = await getGuild(message.raw.guild_id);

  await message.reply(JSON.stringify(guild_data));
};

export default reaction;
