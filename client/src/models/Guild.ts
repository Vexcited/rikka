import { Schema, model } from "mongoose";

// Create an interface representing a document in MongoDB.
interface Guild {
  id: string;
}

// Create a Schema corresponding to the document interface.
const schema = new Schema<Guild>({
  id: { type: String, required: true }
});

// Create a Model.
const GuildModel = model<Guild>("Guild", schema);
export default GuildModel;