const express = require("express");
const router = express.Router();
const userValidator = require("../middleware/auth");
const upload = require("../middleware/multer");
const User = require("../models/User");
router.get("/profile", userValidator, (req, res) => {
  // console.log(req.user);
  return res.status(200).json({
    success: true,
    user: req.user,
  });
});
router.patch("/updateProfile", userValidator, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      username,
      role,
      location,
      bio,
      profilePicture,
    } = req.body;
    const user = await User.findOne({ username });
    if (user && user._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "username is already taken pls find other one",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          firstName,
          lastName,
          username,
          role,
          location,
          bio,
          profilePicture,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      user: updatedUser,
      message: "profile updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error occured during updating profile",
      error: error,
    });
  }
});
router.patch(
  "/profile/pictureUpdate",
  userValidator,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const profilepicpath = req.file
        ? `${req.protocol}://${req.get("host")}/${req.file.path.replace(
            /\\/g,
            "/"
          )}`
        : null;
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { profilePicture: profilepicpath } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "profile successfully updated",
        user: user,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error in updating profile picture",
      });
    }
  }
);
router.post(
  "/profile/addImages",
  userValidator,
  upload.array("profileImages"),
  async (req, res) => {
    try {
      const imagesPath = req.files.map((file) => file.path);
      if (imagesPath.length == 0) {
        return res
          .status(400)
          .json({ success: false, message: "No images uploaded" });
      }
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { $push: { profileImages: { $each: imagesPath } } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "profile images successfully updated",
        user: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in updating images",
        error: error,
      });
    }
  }
);
module.exports = router;
