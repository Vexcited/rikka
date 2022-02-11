import WebSocket from "ws";
import HandleGatewayMessage from "./handleGatewayMessage.js";

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

  constructor (token: string) {
    this.token = token;
    this.heartbeat_interval = undefined;

    this.gateway_connection = this.initialize();

    // Handle errors from the gateway.
    this.gateway_connection.on("error", () => {
      // TODO: Logger for better details.
      throw Error ("Error from the gateway.");
    });

    this.gateway_connection.on("message", (evt) => {
      const message = JSON.parse(evt.toString());
      console.info("New message:", message);

      HandleGatewayMessage(message, this);
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

      console.debug("Sending heartbeat...", heartbeat_data);
      this.gateway_connection.send(JSON.stringify(heartbeat_data));
    }, heartbeat_interval);
  }
}

export default DiscordBotClient;