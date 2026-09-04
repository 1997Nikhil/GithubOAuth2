const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
    },

    displayName: {
      type: String,
    },

    email: {
      type: String,
    },

    avatar: {
      type: String,
    },

    githubProfileUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);