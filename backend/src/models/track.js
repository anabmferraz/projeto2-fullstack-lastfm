import mongoose from "mongoose";

const trackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  artist: { type: String, required: true },
  image: String,
  playedAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

export default mongoose.model("track", trackSchema);
