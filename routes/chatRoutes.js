const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Get chat history of two users
router.get("/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversationId }).sort({
      timestamp: 1,
    });
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Send a message
router.post("/send", async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;
    const conversationId = [sender, receiver].sort().join("_"); // Unique chat ID

    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      conversationId,
    });

    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
