import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// export this function and imported by server.js

const Connect = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mongoose.set('useFindAndModify', false);
  mongoose.set('useCreateIndex', true);

  mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection is open to ${process.env.DB_URI}`);
  });

  mongoose.connection.on('error', err => {
    console.log(`Mongoose default connection has occured ${err} error`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
  });
};

export default Connect;
