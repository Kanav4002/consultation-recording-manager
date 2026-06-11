const Consultation = require("../models/Consultation");
const fs = require("fs");

const createConsultation = async (req, res) => {
  try {
    const { clientName, title, category, consultationDate, description } =
      req.body;

    // Validate metadata
    if (!clientName || !title || !category || !consultationDate) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        message: "Audio file is required",
      });
    }

    const consultation = await Consultation.create({
      userId: req.user.userId,

      clientName,
      title,
      category,
      consultationDate,
      description,

      audioPath: req.file.path,

      originalFileName: req.file.originalname,

      fileSize: req.file.size,

      mimeType: req.file.mimetype,
    });

    res.status(201).json({
      message: "Consultation created successfully",

      consultation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({
      userId: req.user.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: consultations.length,
      consultations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getConsultationById = async (req, res) => {
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

    res.status(200).json({
      consultation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const updateConsultation = async (req, res) => {
  try {
    const { clientName, title, category, consultationDate, description } =
      req.body;

    const consultation = await Consultation.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!consultation) {
      return res.status(404).json({
        message: "Consultation not found",
      });
    }

    consultation.clientName = clientName || consultation.clientName;

    consultation.title = title || consultation.title;

    consultation.category = category || consultation.category;

    consultation.consultationDate =
      consultationDate || consultation.consultationDate;

    consultation.description = description ?? consultation.description;

    await consultation.save();

    res.status(200).json({
      message: "Consultation updated successfully",

      consultation,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteConsultation = async (req, res) => {
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

    if (consultation.audioPath && fs.existsSync(consultation.audioPath)) {
      fs.unlinkSync(consultation.audioPath);
    }

    await consultation.deleteOne();

    res.status(200).json({
      message: "Consultation deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createConsultation,
  getConsultations,
  getConsultationById,
  updateConsultation,
  deleteConsultation,
};
