import mongoose  from 'mongoose';
mongoose.Promise = global.Promise;

export async function connect(url: string) {

    mongoose.set('strictQuery', true);
    await mongoose.connect(url);
    console.log('[DB] Mongo Online');
}