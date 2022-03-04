import mongoose from "mongoose";

// Create an interface representing a document in MongoDB.
interface Guild {
  id: string;

  /** Data used for "role-reaction" feature. */
  reactions: {
    [channel_id: string]: {
      /** Reaction Emote ID => Gives Role ID. */
      [emote: string]: string;
    }
  }
}

// Create a Schema corresponding to the document interface.
const schema = new mongoose.Schema<Guild>({
  id: { type: String, required: true },

  reactions: {
    type: Map,
    of: {
      type: Map,
      of: String
    },

    required: true,
    default: {}
  }
});

// Create a Model.
const GuildModel = mongoose.model<Guild>("Guild", schema);
export default GuildModel;
