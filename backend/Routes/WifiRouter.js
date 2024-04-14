import express from 'express'
import WifiModel from '../Models/wifiModel.js'

// connectDB()
const wifiRouter = express.Router()

let toggleBtn = false
wifiRouter.post('/toggle', async (req, res) => {
  try {
    console.log(req.body)
    toggleBtn = !toggleBtn
    const setData = { btnStatus: toggleBtn }
    const response = await WifiModel.findOneAndUpdate(
      { name: req.body.name },
      { $set: setData },
      {
        upsert: true,
        new: true
      }
    )
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ message: 'error while updating data' })
  }
})
wifiRouter.get('/status', async (req, res) => {
  try {
    const response = await WifiModel.findOne({ name: 'wifiBtn' })
    // console.log(response)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: 'data not found ' })
  }
})
wifiRouter.post('/data', async (req, res) => {
  console.log(req.body)
  try {
    const setdata = {
      networkName: req.body.networkName,
      password: req.body.password,
      name: req.body.name,
    
      security: req.body.security,
      privacy: req.body.privacy,
      hiddenNetwork: req.body.hidden
    }
    const response = await WifiModel.findOneAndUpdate(
      { networkName: req.body.networkName },
      { $set: setdata },
      { upsert: true, new: true }
    )
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: 'data not found' })
  }
})
wifiRouter.get('/getdata', async (req, res) => {
  try {
    const networks = await WifiModel.find({ name: 'networkForm' })
    res.status(200).json(networks)
  } catch (error) {
    res.status(500).json({ message: 'data not found' })
  }
})

wifiRouter.delete('/delete/:id', async (req, res) => {
  try {
    const response = await WifiModel.deleteOne({ _id: req.params.id })
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ message: 'network not found' })
  }
})
export default wifiRouter
