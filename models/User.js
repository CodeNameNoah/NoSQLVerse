// Importing the necessary modules from the mongoose library.
const { Schema, model, Types } = require("mongoose");

// Creating a new user schema using the Schema class from mongoose.
const userSchema = new Schema(
  {
    // Defining the "username" field of type String with additional properties.
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    // Defining the "email" field of type String with additional properties.
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address!",
      ],
    },
    // Defining the "thoughts" field as an array of object IDs referencing the "Thought" model.
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // Defining the "friends" field as an array of object IDs referencing the "User" model.
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Configuring the toJSON option for the schema to include virtual properties.
    toJSON: {
      virtuals: true,
    },
    // Disabling the generation of the "id" virtual property.
    id: false,
  }
);

// Creating a virtual property "friendCount" using the virtual() function of the schema.
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

// Creating a model named "User" based on the userSchema.
const User = model("User", userSchema);

// Exporting the User model.
module.exports = User;
