import mongoose from "mongoose";

type ConnectionObject = {
    isConnected: boolean;
}


const connectDb: ConnectionObject = {
    isConnected: false,
};


const MONGOURI = process.env.MONGO_URI;


async function dbConnect(): Promise<void> {
    if (connectDb.isConnected) {
        console.log("Already connected");
        return;
    }
    
    try {
        const db = await mongoose.connect(MONGOURI);

        connectDb.isConnected = db.connection.readyState === 1;
        console.log("Connected to MongoDB");

        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}




export default dbConnect;
