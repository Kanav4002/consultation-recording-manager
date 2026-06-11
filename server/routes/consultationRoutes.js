const express = require("express");

const { createConsultation } = require("../controllers/consultationController");

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../config/multerConfig");

const router = express.Router();

router.post("/", authMiddleware, upload.single("audio"), createConsultation);

module.exports = router;
