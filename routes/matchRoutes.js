const express = require("express");
const router = express.Router();
const userValidator = require("../middleware/auth");
const User = require("../models/User");
const Match = require("../models/Match");
const Swipe = require("../models/Swipe");
const Skipped = require("../models/Skipped");

router.get("/", userValidator, async (req, res) => {
  try {
    // Fetch matched user IDs
    const matchedUsers = await Match.find({
      $or: [{ user1: req.user._id }, { user2: req.user._id }],
    }).select("user1 user2 -_id");

    // Fetch skipped user IDs
    const skippedUsers = await Skipped.find({ sender_id: req.user._id }).select(
      "receiver_id -_id"
    );

    // Extract user IDs from the matched list
    const matchedUserIds = matchedUsers.flatMap((match) =>
      match.user1.toString() === req.user._id.toString()
        ? match.user2
        : match.user1
    );

    // Extract skipped user IDs
    const skippedUserIds = skippedUsers.map((user) =>
      user.receiver_id.toString()
    );

    // Fetch users excluding self, matched users, and skipped users
    const users = await User.find({
      _id: { $nin: [req.user._id, ...matchedUserIds, ...skippedUserIds] }, // ✅ Exclude matched & skipped users
    });

    if (!users.length) {
      return res.status(200).json({
        success: true,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/skip/:id", userValidator, async (req, res) => {
  try {
    const skip = await new Skipped({
      sender_id: req.user._id,
      receiver_id: req.params.id,
    });
    await skip.save();
    return res.status(200).json({
      success: true,
      message: "User skipped",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.post("/like/:id", userValidator, async (req, res) => {
  try {
    const frndReq = new Swipe({
      sender_id: req.user._id,
      receiver_id: req.params.id,
      status: "pending",
    });
    await frndReq.save();

    try {
      const io = req.app.get("io");
      if (io) {
        io.emit("friend_request_sent", {
          sender_id: req.user._id,
          receiver_id: req.params.id,
        });
      }
    } catch (socketError) {
      console.error("Socket error:", socketError);
      // Continue with the response even if socket fails
    }

    return res.status(200).json({
      success: true,
      message: "Friend request sent",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.post("/accept/:request_id", userValidator, async (req, res) => {
  try {
    const frndReq = await Swipe.findByIdAndUpdate(
      req.params.request_id,
      {
        $set: {
          status: "accepted",
        },
      },
      { new: true }
    );

    if (!frndReq) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }
    const user1 = frndReq.sender_id;
    const user2 = frndReq.receiver_id;
    const newMatch = await new Match({
      user1,
      user2,
    });
    await newMatch.save();

    try {
      const io = req.app.get("io");
      if (io) {
        io.emit("friend_request_accepted", {
          user1,
          user2,
        });
      }
    } catch (socketError) {
      console.error("Socket error:", socketError);
      // Continue with the response even if socket fails
    }

    return res.status(200).json({
      success: true,
      message: "Friend request accepted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.post("/reject/:request_id", userValidator, async (req, res) => {
  try {
    const frndReq = await Swipe.findByIdAndUpdate(
      req.params.request_id,
      { $set: { status: "rejected" } },
      { new: true }
    );

    try {
      const io = req.app.get("io");
      if (io) {
        io.emit("friend_request_rejected", {
          user1: frndReq.sender_id,
          user2: frndReq.receiver_id,
        });
      }
    } catch (socketError) {
      console.error("Socket error:", socketError);
      // Continue with the response even if socket fails
    }

    res.status(200).json({
      success: true,
      message: "Friend request rejected",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.get("/friends", userValidator, async (req, res) => {
  try {
    const allFriends = await Match.find({
      $or: [{ user1: req.user._id }, { user2: req.user._id }],
    });
    // Extract friend IDs (excluding req.user._id)
    const friendIds = allFriends.map((match) =>
      match.user1.equals(req.user._id) ? match.user2 : match.user1
    );
    // Fetch user details
    const friends = await User.find({ _id: { $in: friendIds } });
    res.status(200).json({
      success: true,
      users: friends,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
router.get("/requests", userValidator, async (req, res) => {
  try {
    // Get received requests
    const receivedRequests = await Swipe.find({
      receiver_id: req.user._id,
      status: "pending",
    }).populate("sender_id");

    // Get sent requests
    const sentRequests = await Swipe.find({
      sender_id: req.user._id,
      status: "pending",
    }).populate("receiver_id");

    if (receivedRequests.length === 0 && sentRequests.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No pending friend requests",
      });
    }

    // Format received requests
    const formattedReceivedRequests = receivedRequests.map((request) => ({
      request_id: request._id,
      sender: request.sender_id,
      type: "received",
    }));

    // Format sent requests
    const formattedSentRequests = sentRequests.map((request) => ({
      request_id: request._id,
      receiver: request.receiver_id,
      type: "sent",
    }));

    return res.status(200).json({
      success: true,
      receivedRequests: formattedReceivedRequests,
      sentRequests: formattedSentRequests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
