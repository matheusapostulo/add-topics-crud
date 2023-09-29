import mongoose, { mongo } from "mongoose";

const conectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("CONNECTED TO MONGODB!")
    } catch (error){
        console.log(error);
    }
};

export default conectMongoDB;