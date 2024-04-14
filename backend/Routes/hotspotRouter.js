import express from 'express'
import hotspotModel from '../Models/hotspotModel.js'
import connectDB from '../db.js'

const hotspotRouter = express.Router()

// toggle buttons
let toggle = false
hotspotRouter.get('/status', async (req, res) => {
  try {
    const hotspot = await hotspotModel.findOne({ btnName: 'hotspot' })
    const hotspotAuto = await hotspotModel.findOne({ btnName: 'hotspotAuto' })
    const usbT = await hotspotModel.findOne({ btnName: 'usbT' })
    const blueT = await hotspotModel.findOne({ btnName: 'blueT' })
    const ethernet = await hotspotModel.findOne({ btnName: 'ethernet' })
    const supSixth = await hotspotModel.findOne({ btnName: 'supSixth' })
    const dataLimitBtn = await hotspotModel.findOne({ btnName: 'data Limit Btn' })

    const toggleBtns = {dataLimitBtn,
      hotspot,
      hotspotAuto,
      blueT,
      usbT,
      ethernet,
      supSixth
    }

    res.status(200).json(toggleBtns)
    console.log(data)
  } catch (err) {
    res.status(404)
  }
})

hotspotRouter.post('/toggle', async (req, res) => {
  try {
    toggle = !toggle
    const name = req.body.name
    const data = { btnStatus: toggle }
    const response = await hotspotModel.findOneAndUpdate(
      { btnName: name },
      { $set: data },
      { upsert: true, new: true }
    )
    res.status(200).json(response)
  } catch (err) {
    console.log('data cannot be saved ', err)
  }
})

hotspotRouter.post('/data', async (req, res) => {
  console.log(req.body)
  try {
    const setdata = {
      networkName: req.body.networkName,
      password: req.body.password,
      name: req.body.name,
exceed:req.body.exceed,
size:req.body.size,
      Security: req.body.security,
      APBand: req.body.APBand,
      SSID: req.body.SSID
    }
    const response = await hotspotModel.findOneAndUpdate(
      { name: req.body.name },
      { $set: setdata },
      { upsert: true, new: true }
    )
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: 'data not found' })
  }
})
hotspotRouter.get('/getdata', async (req, res) => {
  try {
    const hotspot = await hotspotModel.findOne({ name: 'hotspotForm' })
    const dataLimit = await hotspotModel.findOne({ name: 'data limit' })
    res.status(200).json({hotspot,dataLimit})
  console.log(dataLimit);
  } catch (error) {
    res.status(500).json({ message: 'data not found' })
  }
})

export default hotspotRouter
