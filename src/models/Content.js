import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema(
  {
    page: { type: String, required: true },   // e.g. "home", "about-school"
    section: { type: String, required: true }, // e.g. "hero", "stats"
    data: { type: mongoose.Schema.Types.Mixed, required: true }, // any JSON
  },
  { timestamps: true }
);

ContentSchema.index({ page: 1, section: 1 }, { unique: true });

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema);
