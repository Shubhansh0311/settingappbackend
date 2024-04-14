import mongoose from 'mongoose'
import dotenv from "dotenv"
dotenv.config()
const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URL,
    {  
        useNewUrlParser: true,
        useUnifiedTopology: true,})

    console.log('database connected')
  } catch (err) {
    console.log(err)
  }
}


export default connectDB