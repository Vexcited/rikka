import WebSocket from "ws";

import type {
  EventReadyData
} from "../types/GatewayEvents.js";

import handleGatewayMessage from "./handleGatewayMessage.js";
import handleGatewayClose from "./handleGatewayClose.js";

class DiscordBotClient {
  /** Discord bot token. */
  private token: string;

  /** Gateway connection to Discord. */
  public gateway_connection: WebSocket;

  /**
   * Interval in miliseconds we should send
   * `Heartbeat` to Discord Gateway.
   * Value given in the `Hello` OP code.
   * See <https://discord.com/developers/docs/topics/gateway#hello>.
   */
  private heartbeat_interval?: NodeJS.Timer;

  /** Data from `READY` dispatch message. */
  public bot_data?: EventReadyData;

  /** Current sequence needed when resuming connection. */
  public bot_current_sequence: number;

  constructor (token: string) {
    if (!token) {
      throw new Error("Expected one parameter: 'token', in DiscordBotClient constructor.");
    }

    this.token = token;
    this.bot_current_sequence = 0;

    // Initialize connection to Discord Gateway.
    this.gateway_connection = this.initialize();

    // Handle errors from the gateway.
    this.gateway_connection.on("close", (code) => {
      handleGatewayClose(code);
    });

    this.gateway_connection.on("message", (evt) => {
      const message = JSON.parse(evt.toString());
      handleGatewayMessage(message, this);
    });
  }

  /**
   * Initialize connection to Discord
   * WebSockets UR with given token.
   */
  private initialize () {
    /** See <https://discord.com/developers/docs/topics/gateway#connecting-to-the-gateway>. */
    const gateway_url = new URL("wss://gateway.discord.gg");

    /**
     * Version of the gateway to use.
     * `9` is the latest version.
     * See <https://discord.com/developers/docs/topics/gateway#gateways-gateway-versions>.
     */
    gateway_url.searchParams.append("v", "9");

    /** We currently use JSON encoding. */
    gateway_url.searchParams.append("encoding", "json");

    // Connect to the gateway.
    const gateway_connection = new WebSocket(gateway_url);
    return gateway_connection;
  }

  public setup_heartbeat (heartbeat_interval: number) {
    // Clear any previous heartbeat interval.
    if (this.heartbeat_interval) {
      clearInterval(this.heartbeat_interval);
    }

    /** Debug */ console.debug(
      `Setting up new heartbeat interval to ${heartbeat_interval}.`
    );

    // Set new heartbeat interval.
    this.heartbeat_interval = setInterval(() => {
      const heartbeat_data = {
        op: 1, // Heartbeat
        d: null
      };

      console.debug("Sending heartbeat");
      this.gateway_connection.send(JSON.stringify(heartbeat_data));
    }, heartbeat_interval);
  }

  public send_identify_message () {
    const identify_data = {
      op: 2, // Identify
      d: {
        token: this.token,
        intents:
            1 << 0 // GUILDS
          | 1 << 1 // GUILD_MEMBERS
          | 1 << 2 // GUILD_BANS
          | 1 << 9, // GUILD_MESSAGES
        properties: {
          "$os": "linux",
          "$browser": "Rikka",
          "$device": "Rikka"
        },

        // Currently we don't compress.
        compress: false,

        presence: {
          status: "online",
          activities: [
            {
              type: "LISTENING",
              name: "user commands",
              created_at: Date.now()
            }
          ]
        }
      }
    };

    console.debug("Sending identify message");
    this.gateway_connection.send(JSON.stringify(identify_data));
  }

  public send_resume_message () {
    // If the bot_data is missing, reload everything. 
    if (!this.bot_data) {
      return this.send_identify_message();
    }

    const resume_data = {
      op: 6, // Resume
      d: {
        token: this.token,
        session_id: this.bot_data.session_id,
        seq: this.bot_current_sequence
      }
    };

    console.debug("Sending resume message");
    this.gateway_connection.send(JSON.stringify(resume_data));
  }
}

export default DiscordBotClient;