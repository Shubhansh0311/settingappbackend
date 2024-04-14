import express from 'express'

import aboutModel from '../Models/AboutModel.js'

const phoneId = 'phone'
const aboutRouter = express.Router()
let restoreStatus = false

aboutRouter.get('/phoneName', async (req, res) => {
  try {
    const data = await aboutModel.findOne({ id: 'phone' })
    res.status(201).json(data)
  } catch (error) {
    console.log('error found ', error)
  }
})
aboutRouter.post('/rename', async (req, res) => {
  const name = { name: req.body.name } //   try {

  try {
    const data = await aboutModel.findOneAndUpdate(
      { id: phoneId },
      {
        $set: name
      },
      { upsert: true, new: true }
    )

    res.json(data).status(201)
  } catch (err) {
    res.status(500).send('error found')
  }
})

// restoreBtn

// GET API to fetch WiFi status from MongoDB
aboutRouter.get('/restoreStatus', async (req, res) => {
  try {
    // Fetch WiFi status from MongoDB
    const aboutData = await aboutModel.findOne({ name: 'restoreBtn' })
    // const newData = await aboutData.filter(e => e.btnStatus != null)

    res.json(aboutData)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST API to toggle WiFi status and update MongoDB
aboutRouter.post('/toggleRestore', async (req, res) => {
  try {
    // Toggle WiFi status
    // defined by us
    restoreStatus = !restoreStatus
    const data = {
      btnStatus: restoreStatus,
      name: req.body.data.name
    }
    // Update WiFi status in MongoDB
    await aboutModel.findOneAndUpdate(
      { name: 'restoreBtn' },
      { $set: data },
      { upsert: true, new: true }
    )

    res.json({ btnStatus: restoreStatus })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})
export default aboutRouter
