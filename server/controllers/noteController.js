const Note = require("../models/Note");
const Consultation = require("../models/Consultation");

const createNote = async (req, res) => {
  try {
    const { content } = req.body;
    const consultationId = req.params.id;

    if (!content) {
      return res.status(400).json({
        message: "Note content is required",
      });
    }

    // Verify consultation exists and belongs to user
    const consultation = await Consultation.findOne({
      _id: consultationId,
      userId: req.user.userId,
    });

    if (!consultation) {
      return res.status(404).json({
        message: "Consultation not found",
      });
    }

    const note = await Note.create({
      consultationId,
      userId: req.user.userId,
      content,
    });

    res.status(201).json({
      message: "Note created successfully",
      note,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getNotes = async (req, res) => {
  try {
    const consultation = await Consultation.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!consultation) {
      return res.status(404).json({
        message: "Consultation not found",
      });
    }

    const notes = await Note.find({
      consultationId: req.params.id,
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: notes.length,
      notes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateNote = async (req, res) => {
  try {
    const { content } = req.body;

    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    note.content = content || note.content;

    await note.save();

    res.status(200).json({
      message: "Note updated successfully",
      note,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    await note.deleteOne();

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
