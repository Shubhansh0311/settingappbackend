import mongoose from 'mongoose'

const connectionSchema = new mongoose.Schema({
  id: {
    type: String
  },
  AccountName: {
    type: String
  },
  DeviceName: {
    type: String
  },
  btnStatus: {
    type: Boolean
  },
  name: {
    type: String
  },

  mode: {
    type: String
  },
  email: {
    type: String
  },

  DNSName: { type: String },
  SimName: { type: String },
  createdAt: {
    type: Date,
    default: Date.now()
  },
})
const connectionModel = new mongoose.model('connection', connectionSchema)
export default connectionModel
