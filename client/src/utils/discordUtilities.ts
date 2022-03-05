import DiscordBotClient from "../client/Discord.js";
import { GuildMember, Permissions } from "../types/DiscordApi.js";

export function checkPermissions (
  current_permissions: number,
  needed_permissions: Permissions[]
) {
  // Administrator bypasses all permissions.
  if (current_permissions & Permissions.ADMINISTRATOR) return true;

  const needed_permissions_number = needed_permissions.reduce((acc, perm) => {
    return acc | perm;
  }, 0);

  return (current_permissions & needed_permissions_number) === needed_permissions_number;
}

export class DiscordUtilities {
  private client: DiscordBotClient;

  constructor (client: DiscordBotClient) {
    this.client = client;
  }

  public async fetchUser (user_id: string, guild_id: string) {
    try {
      const response = await this.client.request_api.get(`guilds/${guild_id}/members/${user_id}`)
        .json<GuildMember>();

      return response;
    }
    catch (e) {
      console.error(e);
    }
  }
}
