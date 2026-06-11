const Consultation = require("../models/Consultation");

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

module.exports = {
  createConsultation,
};
