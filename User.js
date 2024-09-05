const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    telegramId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
    },
    isAlphaTester: {
      type: Boolean,
      default: false,
    },
    mail9424: {
      type: Boolean,
      required: false,
    }
  },
  {
    timestamps: true, // Это автоматически добавляет поля createdAt и updatedAt
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;