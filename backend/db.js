import mongoose from 'mongoose'
const connectDB = async () => {
  try {
    const db = await mongoose.connect("mongodb+srv://shubhansh:shubhansh@cluster0.ia7xyfr.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0/test")

    console.log('database connected')
  } catch (err) {
    console.log(err)
  }
}
connectDB()

export default connectDB