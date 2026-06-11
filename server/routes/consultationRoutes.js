const express = require("express");

const { 
  createConsultation, 
  getConsultations, 
  getConsultationById,
  updateConsultation,
  deleteConsultation,
} = require("../controllers/consultationController");

const authMiddleware = require("../middleware/authMiddleware");

const upload = require("../config/multerConfig");
const router = express.Router();

router.get("/", authMiddleware, getConsultations);
router.get("/:id", authMiddleware, getConsultationById);
router.post("/", authMiddleware, upload.single("audio"), createConsultation);
router.put("/:id", authMiddleware, updateConsultation);
router.delete("/:id", authMiddleware, deleteConsultation);

module.exports = router;
