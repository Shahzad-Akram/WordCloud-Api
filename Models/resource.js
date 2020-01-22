import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  name: String,
  caption: String,
  url: String,
  type: String,
  wordFrequency: []
});

export default mongoose.model('Resource', resourceSchema);
