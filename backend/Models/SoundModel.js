import mongoose from 'mongoose'

const soundSchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
    type: String
  },
  Tone: {
    type: String
  },
  btnStatus: {
    type: Boolean,
    default: false
  },
  btnName: {
    type: String
  },
  range: {
    type: Number
  },

  mode: {
    type: String
  },
  Equalizers:{
    type:{}
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
 
})
const soundModel = new mongoose.model('sound', soundSchema)
export default soundModel
