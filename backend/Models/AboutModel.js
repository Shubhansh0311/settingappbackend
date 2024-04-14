import mongoose from 'mongoose'

const aboutShchema = new mongoose.Schema({
  id: { type: String, default: null },
  name: {
    type: String,
    default: null
  },

  btnStatus: {
    type: Boolean,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
})
const aboutModel = new mongoose.model('About', aboutShchema)
export default aboutModel
