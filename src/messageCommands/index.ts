import type Message from "../utils/Message";
export type MessageCommandType = (
  message: Message,
  args: string[]
) => Promise<void>;

// Importing all the commands.
import helpCommand from "./help.js";

// Exporting commands as a dictionnary.
const messageCommands = {
  "help": helpCommand
};

export default messageCommands;
