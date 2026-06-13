const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "consultation-recordings",
    resource_type: "video",
    format: (req, file) => file.originalname.split(".").pop(),
    public_id: (req, file) =>
      `${Date.now()}-${Math.round(Math.random() * 1e9)}`,
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["audio/mpeg", "audio/wav", "audio/x-wav"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only MP3 and WAV audio files are allowed"), false);
  },
});

module.exports = { cloudinary, upload };
