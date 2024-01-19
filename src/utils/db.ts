import mongoose from 'mongoose';

// TODO: refactor this piece of shit
async function connect() {
  // This check if the connection already exist
  if (mongoose.connections[0].readyState) return;
  else {
    try {
      await mongoose.connect(process.env.MONGODB_URI ?? '');
      // eslint-disable-next-line no-console
      console.log('mongodb connection established');
    } catch (error) {
      throw new Error('Error connecting to MongoDB');
    }
  }
}

export default connect;
