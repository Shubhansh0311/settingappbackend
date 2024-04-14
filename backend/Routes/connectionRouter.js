import express from 'express'
import connectionModel from '../Models/ConnectionModel.js'
const connectionRouter = express.Router()
let toggle = false
connectionRouter.post('/toggle', async (req, res) => {
  console.log(req.body)
  try {
    const name = req.body.name
    toggle = !toggle
    const updateData = { btnStatus: toggle }
    const response = await connectionModel.findOneAndUpdate(
      { name: name },
      {
        $set: updateData
      },
      {
        upsert: true,
        new: true
      }
    )
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ message: 'data not exist' })
    console.log('error while fetching data from the database ', err)
  }
})

connectionRouter.get('/status', async (req, res) => {
  try {
    const AeroplaneMode = await connectionModel.findOne({
      name: 'AeroplaneMode'
    })
    const VPN = await connectionModel.findOne({ name: 'VPN' })
    const WirelessDisplay = await connectionModel.findOne({
      name: 'WirelessDisplay'
    })
    const castBtn = await connectionModel.findOne({
      name: 'CastBtn'
    })
    const DeviceVisibility = await connectionModel.findOne({
      name: 'DeviceVisibility'
    })
    const DeviceNotification = await connectionModel.findOne({
      name: 'DeviceNotification'
    })
    res.status(200).json({
      AeroplaneMode,
      VPN,
      WirelessDisplay,
      castBtn,
      DeviceNotification,
      DeviceVisibility
    })
  } catch (error) {
    res.status(500).json({ message: 'data not exist' })
    console.log('error while fetching data from the database ', err)
  }
})

connectionRouter.post('/data', async (req, res) => {
  try {
    const setData = {
      DNSName: req.body.data.DnsName,
      mode: req.body.data.mode,
      SimName: req.body.data.simName,
      email: req.body.data.email,
      AccountName: req.body.data.accName,
      DeviceName: req.body.data.deviceName
    }
    console.log(req.body);
    const response = await connectionModel.findOneAndUpdate(
      { name: req.body.data.name },
      { $set: setData },
      { upsert: true, new: true }
    )

    res.status(200).json(response)
  } catch (err) {
    res.status(500).json({ message: 'error while getting recieving data ' })
  }
})
connectionRouter.get('/getData', async (req, res) => {
  try {
    const PrivateDns = await connectionModel.findOne({ name: 'PrivateDns' })
    const SimCardReset = await connectionModel.findOne({ name: 'SimCardReset' })
    const Account = await connectionModel.findOne({ name: 'Account' })
    const ChromebookAccount = await connectionModel.findOne({ name: 'ChromebookAccount' })
    const DeviceName = await connectionModel.findOne({ name: 'DeviceName' })

    res.status(200).json({ PrivateDns, SimCardReset, Account,DeviceName,ChromebookAccount})
  } catch (error) {
    res.status(500).json({ message: 'Data not found' })
  }
})
export default connectionRouter
