import type { MessageCommandType } from "./index.js";
const help: MessageCommandType = async (message) => {
  await message.reply("Received message from " + message.raw.author.username + " !");
};

export default help;
