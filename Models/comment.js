import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  videoId: String,
  username: String,
  email: String,
  text: String
});

export default mongoose.model('Comment', commentSchema);
