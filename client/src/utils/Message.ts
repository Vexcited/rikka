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
    }).json();

    return response;
  }
}

export default Message;
