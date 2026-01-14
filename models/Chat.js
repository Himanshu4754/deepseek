import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "New Chat",
  },
  question: {
    type: String,
    default: "",
  },
  messages: [
    {
      role: {
        type: String,
        enum: ["user", "assistant"],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Number,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
ChatSchema.pre("save", function () {
  this.updatedAt = Date.now();
});

const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);

export default Chat;