import type { MessageCommandType } from "./index.js";

import { DiscordUtilities, checkPermissions } from "../utils/discordUtilities.js";
import { Permissions } from "../types/DiscordApi.js";

const ping: MessageCommandType = async (message) => {
  // const ws_ping = message.client.gateway_connection_ping;

  const utils = new DiscordUtilities(message.client);
  const user = await utils.fetchUser(message.raw.author.id, message.raw.guild_id as string);
  console.log(user);

  const perms = user?.permissions as string;
  const check = checkPermissions(parseInt(perms), [
    Permissions.MANAGE_GUILD
  ]);

  console.log(perms, check);
};

export default ping;
