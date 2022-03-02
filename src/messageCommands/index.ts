import type Message from "../utils/Message";
export type MessageCommandType = (
  message: Message,
  args: string[]
) => Promise<void>;

// Importing all the commands.
import helpCommand from "./help.js";
import pingCommand from "./ping.js";

// Exporting commands as a dictionnary.
const messageCommands = {
  "help": helpCommand,
  "ping": pingCommand
};

export default messageCommands;
