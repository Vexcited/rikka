import Guild from "../models/Guild.js";

export async function getGuild (id: string) {
  const guild = await Guild.findOne({ id }) || await Guild.create({ id });
  return guild;
}
