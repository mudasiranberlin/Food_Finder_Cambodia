import mongoose from 'mongoose';
import { env } from './env.js';

mongoose.set('strictQuery', true);

export async function connectDB() {
  try {
    await mongoose.connect(env.mongoUri, { serverSelectionTimeoutMS: 8000 });
    console.log('✅  MongoDB connected');
  } catch (err) {
    console.error('\n❌  Could not connect to MongoDB.');
    console.error('    Is MongoDB running? Check MONGODB_URI in your .env file.');
    console.error(`    (${err.message})\n`);
    process.exit(1);
  }
}
