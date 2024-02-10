import mongoose from 'mongoose';

export async function connect() {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // const connection = await mongoose.connection;
    // connection.on('connected', () => {
    //   console.log('MongoDB connected successfully');
    // });
    console.log('Mongo Connection successfully established.');
  } catch (error) {
    console.log('Something goes wrong');
    console.log(error);
  }
}
