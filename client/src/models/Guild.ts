import mongoose from "mongoose";

// Create an interface representing a document in MongoDB.
interface Guild {
  guild_id: string;

  /** Data used for "role-reaction" feature. */
  reactions?: Map<string, Map<string, string>>;
}

// Create a Schema corresponding to the document interface.
const schema = new mongoose.Schema<Guild>({
  guild_id: { type: String, required: true },

  reactions: {
    type: Map,
    of: {
      type: Map,
      of: String
    }
  }
});

// Create a Model.
const GuildModel = mongoose.model<Guild>("Guild", schema);
export default GuildModel;
