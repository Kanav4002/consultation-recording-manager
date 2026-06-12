const express = require("express");

const { createNote, getNotes, updateNote, deleteNote } = require("../controllers/noteController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/consultations/:id/notes", authMiddleware, createNote);
router.get("/consultations/:id/notes", authMiddleware, getNotes);
router.put("/notes/:id", authMiddleware, updateNote);
router.delete("/notes/:id", authMiddleware, deleteNote);

module.exports = router;
