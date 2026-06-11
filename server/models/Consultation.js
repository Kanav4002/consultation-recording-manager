const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },

    title: {
      type: String,
      required: [true, "Consultation title is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Therapy",
        "Astrology",
        "Legal",
        "Medical",
        "Financial",
        "Coaching",
        "Other",
      ],
    },

    consultationDate: {
      type: Date,
      required: [true, "Consultation date is required"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    audioPath: {
      type: String,
      required: true,
    },

    originalFileName: {
      type: String,
      required: true,
    },

    fileSize: {
      type: Number,
      required: true,
    },

    mimeType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Consultation", consultationSchema);
