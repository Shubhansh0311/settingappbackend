import mongoose from 'mongoose'

const simSchema = new mongoose.Schema({
  id: { type: String, default: null },
  name: {
    type: String,
    default: null
  },

  btnStatus: {
    type: Boolean,
    default: false
  },

  phone: {
    type: String,
    default: null
  },
  simCalling: {
    type: String,
    default: null
  },
  simData: {
    type: String,
    default: null
  },
  networkType: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
})

const simModel = new mongoose.model('Sim', simSchema)
export default simModel
