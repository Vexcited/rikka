import type Message from "../utils/Message";
export type MessageCommandType = (
  message: Message,
  args: string[]
) => Promise<void>;

// Importing all the commands.
import helpCommand from "./help.js";
import pingCommand from "./ping.js";
import reactionCommand from "./reaction.js";

// Exporting commands as a dictionnary.
const messageCommands = {
  "help": helpCommand,
  "ping": pingCommand,
  "reaction": reactionCommand
};

export default messageCommands;
