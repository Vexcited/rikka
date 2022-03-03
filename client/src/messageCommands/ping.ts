import type { MessageCommandType } from "./index.js";
const ping: MessageCommandType = async (message) => {
  const ws_ping = message.client.gateway_connection_ping;
  await message.reply("WS: " + ws_ping + "ms");
};

export default ping;
