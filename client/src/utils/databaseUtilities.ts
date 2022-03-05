import Guild from "../models/Guild.js";

export async function getGuild (id: string) {
  const guild = await Guild.findOne({
    guild_id: id
  })
  // Create it in the database if not found.
  || await Guild.create({
    guild_id: id
  });

  return guild;
}
