import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  videoId: String,
  wordFrequency: []
});

export default mongoose.model('Video', videoSchema);
