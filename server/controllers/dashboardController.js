const Consultation = require("../models/Consultation");
const Note = require("../models/Note");

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.userId;

    const totalConsultations = await Consultation.countDocuments({
      userId,
    });

    const totalNotes = await Note.countDocuments({
      userId,
    });

    const recentConsultations = await Consultation.find({
      userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("clientName title category createdAt");

    res.status(200).json({
      totalConsultations,

      totalNotes,

      totalRecordings: totalConsultations,

      recentConsultations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getDashboardStats,
};
