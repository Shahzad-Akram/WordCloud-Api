import mongoose from 'mongoose';
import dotenv from 'dotenv';

const Connect = () => {
  mongoose
    .connect(
      'DB_URI=mongodb+srv://digisol:digisol@cluster0-oudlk.mongodb.net/wordcloud-api?retryWrites=true&w=majority',
      () => {},
      { useNewUrlParser: true }
    )
    .catch(err => {
      console.log(err);
    });
};

export default Connect;
