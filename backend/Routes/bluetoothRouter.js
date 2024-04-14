import express from 'express'
import bluetoothModel from '../Models/bluetoothModel.js '
import aboutModel from '../Models/AboutModel.js'
// import mongoose from 'mongoose'
// import connectDB from '../db.js'

// connectDB()
let bluetoothToggle = false
const bluetoothRouter = express.Router()

//👉  bluetooth toggle btn
bluetoothRouter.post('/toggle', async (req, res) => {
  try {
    const name = req.body.name
  

    bluetoothToggle = !bluetoothToggle
    const status = { btnStatus: bluetoothToggle }
    const btnStatus = await bluetoothModel.findOneAndUpdate(
      { btnName: name },
      {
        $set: status
      },
      { upsert: true, new: true }
    )
    res.status(201).json(btnStatus)
  } catch (err) {
    res.status(500).json('data not found')
  }
})

bluetoothRouter.get('/status', async (req, res) => {
  try {
    const bluetoothBtn = await bluetoothModel.findOne({
      btnName: 'BluetoothBtn'
    })
    const pairCompatible = await bluetoothModel.findOne({
      btnName: 'PairCompatible'
    })
    const deviceWithoutName = await bluetoothModel.findOne({
      btnName: 'DeviceWithoutName'
    })
    const name = await aboutModel.findOne({ id: 'phone' })

    const data = { bluetoothBtn, pairCompatible, deviceWithoutName, name }
    res.status(200).json(data)
  } catch (err) {
    res.status(404).json({ message: 'data not found ' })
  }
})
export default bluetoothRouter
