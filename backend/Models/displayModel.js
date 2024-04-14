import mongoose from 'mongoose'

const displaySchema = new mongoose.Schema({
  id: {
    type: String
  },
  name: {
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
  selected: {
    type: Boolean
  },
  mode: {
    type: String
  }
  ,fontName:{
    type:String
  },
  Rate:{
    type:String
    
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
})
const displayModel = new mongoose.model('display', displaySchema)
export default displayModel
