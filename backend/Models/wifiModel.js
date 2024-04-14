import mongoose from 'mongoose'

const WifiSchema = new mongoose.Schema({
  id: {
    type: String,
    default: null
  },
  name: { type: String, default: null },
  btnStatus: {
    type: Boolean,
    default: null
  },
  networkName: {
    type: String,
    default: null
  },
  password: {
    type: String,
    default: null
  },
  security: {
    type: String,
    default: null
  },
  hiddenNetwork: {
    type: String,
    default: null
  },
  privacy: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})
const WifiModel = new mongoose.model('Wifi', WifiSchema)
// export default WifiModel

export default WifiModel
