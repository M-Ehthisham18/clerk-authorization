import mongoose from "mongoose";

const connectDB = async ()=> {
  try {
    mongoose.connection.on("connected", ()=>console.log(`mongoDB connected : ${mongoose.connection.name}`)
    )
    await mongoose.connect(`${process.env.MONGODB_URI}clerkAuth`);
  } catch (error) {
    console.log("mongoDB connection error : "+error.message);
    
  }
}

export default connectDB;