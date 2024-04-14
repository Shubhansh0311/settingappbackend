import mongoose from 'mongoose'

const hotspotShchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
  networkName: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now()
  },
  btnStatus: {
    type: Boolean
    // default: false
  },
  btnName: {
    type: String
    // default: null
  },
  SSID: {
    type: String
  },
  APBand: { type: String },
  Security: {
    type: String
  },
  size:{
type:String,

  },
  exceed:{
    type:String
  }
})
const hotspotModel = new mongoose.model('PortableHotspot', hotspotShchema)
export default hotspotModel
