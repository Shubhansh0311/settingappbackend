import mongoose from 'mongoose'

const bluetoothSchema = new mongoose.Schema({
  btnName: {
    type: String
  },

  btnStatus: {
    type: Boolean
  },

  deviceName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
})
const bluetoothModel = new mongoose.model('Bluetooth', bluetoothSchema)
export default bluetoothModel
