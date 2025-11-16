import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  playcount: { type: Number, default: 0 },
  image: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }
});

export default mongoose.model('artist', artistSchema);