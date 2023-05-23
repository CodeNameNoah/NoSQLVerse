const { Schema, Types } = require("mongoose");
const moment = require("moment");

// Define the reaction schema
const reactionSchema = new Schema(
  {
    // Unique identifier for the reaction
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    // Content of the reaction
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    // Username associated with the reaction
    username: {
      type: String,
      required: true,
    },
    // Timestamp for when the reaction was created
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => moment(date).format("MM/DD/YYYY"),
    },
  },
  {
    // Options for the schema
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// Export the reaction schema
module.exports = reactionSchema;
