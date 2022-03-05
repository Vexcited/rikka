import type {
  Message as DiscordApiMessage
} from "../types/DiscordApi";
import type DiscordClient from "../client/Discord";

class Message {
  public raw: DiscordApiMessage;
  public client: DiscordClient;

  constructor (data: DiscordApiMessage, client: DiscordClient) {
    this.raw = data;
    this.client = client;
  }

  public async reply (content: string | null) {
    const response = await this.client.request_api.post(`channels/${this.raw.channel_id}/messages`, {
      json: {
        content
      }
    }).json<Message>();

    return response;
  }

  /**
   * @param emote - Emote the message will be reacted with.
   *
   * Options
   *  - `toReferenced` = true, will react to the referenced message.
   */
  public async react (emote: string, { toReferenced = false } = {}) {
    if (toReferenced && !this.raw.message_reference) return;

    const emote_encoded = encodeURIComponent(emote);
    const message_id = toReferenced ? this.raw.message_reference?.message_id : this.raw.id;
    const channel_id = toReferenced ? this.raw.message_reference?.channel_id : this.raw.channel_id;

    const resquest_url = `channels/${channel_id}/messages/${message_id}/reactions/${emote_encoded}/@me`;
    await this.client.request_api.put(resquest_url);
  }
}

export default Message;
