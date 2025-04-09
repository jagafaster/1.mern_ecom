import mongoose from "mongoose";


const connectDB = async () => {

    mongoose.connection.on('connected', () => console.log('MongoDB connected'));

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
    // await mongoose.connect(`mongodb+srv://jagafaster_ecom:jaga-ecom@ecom.cv94iyo.mongodb.net/e-commerce`);

}

export default connectDB;