import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

const connectDB = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  }

  mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });

  return handler(req, res);
};

export default connectDB; 