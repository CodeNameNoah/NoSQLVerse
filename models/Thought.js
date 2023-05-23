// Importing required modules
const { Schema, model, Types } = require("mongoose");  // Importing Mongoose's Schema, model, and Types
const moment = require("moment");  // Importing Moment.js for date formatting
const reactionSchema = require("./Reaction");  // Importing the reactionSchema from another file

// Defining the thoughtSchema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxLength: 280,
      minLength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => moment(date).format("MM/DD/YYYY"),  // Formats the createdAt date using Moment.js
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],  // Embedding the reactionSchema as an array of reactions
  },
  {
    toJSON: {
      virtuals: true,  // Including virtual properties when converting to JSON
      getters: true,  // Applying getters when converting to JSON
    },
    id: false,  // Excluding the "_id" field from the schema
  }
);

// Defining a virtual property "reactionCount" on thoughtSchema
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;  // Returns the length of the reactions array
});

// Creating a model named "Thought" using the thoughtSchema
const Thought = model("Thought", thoughtSchema);

// Exporting the Thought model
module.exports = Thought;
