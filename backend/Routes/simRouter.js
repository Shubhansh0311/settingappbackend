import express from 'express'
import simModel from '../Models/Sim.js'

const simRouter = express.Router()

simRouter.get('/getSim', async (req, res) => {
  try {
    const sim1 = await simModel.findOne({ id: 'sim1' })
    const sim2 = await simModel.findOne({ id: 'sim2' })
    res.json({ sim1, sim2 }).status(201)
  } catch (err) {
    res.json({ message: 'sim not found' }).status(404)
  }
})
simRouter.post('/setSim', async (req, res) => {
  try {
    const id = req.body.id
    const name = req.body.name
    const data = { name: name }
    const response = await simModel.findOneAndUpdate(
      { id: id },
      { $set: data },
      { upsert: true, new: true }
    )
    res.json(response).status(201)
  } catch (err) {
    res.json({ message: 'sim1 not changed' }).status(500)
  }
})

// phones
simRouter.get('/getPhone', async (req, res) => {
  try {
    const phone1 = await simModel.findOne({ id: 'phone1' })
    const phone2 = await simModel.findOne({ id: 'phone2' })
    res.json({ phone1, phone2 }).status(201)
  } catch (err) {
    res.json({ message: 'phone number not found' }).status(404)
  }
})
simRouter.post('/setPhone', async (req, res) => {
  try {
    const id = req.body.id
    const number = req.body.number
    const data = { phone: number }
    const response = await simModel.findOneAndUpdate(
      { id: id },
      { $set: data },
      { upsert: true, new: true }
    )
    res.json(response).status(201)
  } catch (err) {
    res.json({ message: 'sim1 not changed' }).status(500)
  }
})

// toggle functioning

let toggle = false

simRouter.get('/getToggleStatus', async (req, res) => {
  try {
    // const data=await simModel.findOne({name:'dataBtn'})
    const dataBtn = await simModel.findOne({ name: 'dataBtn' })
    const sim1TurnOn = await simModel.findOne({ name: 'sim1TurnOn' })
    const sim1WifiCall = await simModel.findOne({ name: 'sim1WifiCall' })
    const sim1Volte = await simModel.findOne({ name: 'sim1Volte' })
    const sim2TurnOn = await simModel.findOne({ name: 'sim2TurnOn' })
    const sim2WifiCall = await simModel.findOne({ name: 'sim2WifiCall' })
    const sim2Volte = await simModel.findOne({ name: 'sim2Volte' })
    const networkBtn = await simModel.findOne({ name: 'networkBtn' })

    const togglesData = {
      dataBtn,
      sim1TurnOn,
      sim1WifiCall,
      sim1Volte,
      sim2TurnOn,
      sim2WifiCall,
      sim2Volte,
      networkBtn
    }

    res.json({ togglesData }).status(200)
  } catch {
    res.json({ message: 'dataBtn not found' }).status(404)
  }
})
simRouter.post('/toggleData', async (req, res) => {
  try {
    toggle = !toggle
    const status = { btnStatus: toggle }
    const btnName = req.body.name
    const response = await simModel.findOneAndUpdate(
      { name: btnName },
      { $set: status },
      { upsert: true, new: true }
    )

    res.json(response).status(200)
  } catch (err) {
    res.json('data not found').status(500)
  }
})

// active sim
simRouter.post('/callingSim', async (req, res) => {
  try {
    const sim = { simCalling: req.body.simCalling }
    const response = await simModel.findOneAndUpdate(
      {
        name: 'callingSim'
      },
      { $set: sim },
      { upsert: true, new: true }
    )
    res.json({ message: 'successfull' }).status(200)
  } catch (err) {
    res.status(500).json({ message: 'sim is not activated' })
  }
})
simRouter.get('/getCallingSim', async (req, res) => {
  const response = await simModel.findOne({ name: 'callingSim' })

  res.json(response).status(200)
})

// current active sim for data
simRouter.post('/dataSim', async (req, res) => {
  try {
    const dataSim = { simData: req.body.simData }
    const response = await simModel.findOneAndUpdate(
      {
        name: 'dataSim'
      },
      { $set: dataSim },
      { upsert: true, new: true }
    )
    res.json({ message: 'successfull' }).status(200)
  } catch (err) {
    res.status(500).json({ message: ' data sim is not selected' })
  }
})
simRouter.get('/getDataSim', async (req, res) => {
  const response = await simModel.findOne({ name: 'dataSim' })
  res.json(response).status(200)
})

// network type
simRouter.get('/getNetworkType', async (req, res) => {
  try {
    const response = await simModel.findOne({ name: 'preferredNetwork' })
    res.json(response).status(200)
   
  } catch (err) {
    res.status(500).json({ message: 'data not found' })
  }
})
simRouter.post('/networkType', async (req, res) => {
  try {
    const data = { networkType: req.body.id }
    const response = await simModel.findOneAndUpdate(
      { name: 'preferredNetwork' },
      { $set: data },
      { upsert: true, new: true }
    )
    res.status(201).json(response)
  } catch (err) {
    res.status(500).json({ message: 'request unsuccessfull' })
  }
})

export default simRouter
