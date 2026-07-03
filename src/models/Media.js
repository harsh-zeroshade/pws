import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ["image", "video", "document"], default: "image" },
    size: Number,
    uploadedBy: { type: String, default: "admin" },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
