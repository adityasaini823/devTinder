const path = require("path");
const multer = require("multer");
// Configure storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/"); // Save files in the uploads folder
    },
    filename: function (req, file, cb) {
      cb(null,'image-'+Date.now() + path.extname(file.originalname));
    }
  });
  // File filter to accept only images
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  };
  
  // Initialize Multer
  const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB size limit
  });
  module.exports=upload