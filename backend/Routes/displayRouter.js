import express from 'express'
import displayModel from '../Models/displayModel.js'

// connectDB()
let toggle = false

const displayRouter = express.Router()

displayRouter.post('/toggle', async (req, res) => {
  const name = req.body.name
  toggle = !toggle
  const setData = { btnStatus: toggle }
  const response = await displayModel.findOneAndUpdate(
    { name: name },
    { $set: setData },
    {
      upsert: true,
      new: true
    }
  )
  res.status(201).json(response)
})

displayRouter.post('/data', async (req, res) => {
  const name = req.body.data.name
  const range = req.body.data.range

  const setData = {
    mode: req.body.data.type,
    range: range,
    fontName: req.body.data.fontName,
    Rate: req.body.data.rate
  }
  console.log(req.body)
  const response = await displayModel.findOneAndUpdate(
    { name: name },
    { $set: setData },
    {
      upsert: true,
      new: true
    }
  )
  res.status(201).json(response)
})
displayRouter.get('/status', async (req, res) => {
  const autoRotate = await displayModel.findOne({ name: 'autoRotate' })
  const SdModeBtn = await displayModel.findOne({ name: 'SdModeBtn' })
  const ReadingBtn = await displayModel.findOne({ name: 'ReadingBtn' })
  const ReadingScheduleBtn = await displayModel.findOne({
    name: 'ReadingScheduleBtn'
  })
  const autoBrightness = await displayModel.findOne({ name: 'autoBrightness' })
  const sunlightMode = await displayModel.findOne({ name: 'sunlightMode' })

  res.status(200).json({
    autoRotate,
    SdModeBtn,
    autoBrightness,
    ReadingBtn,
    ReadingScheduleBtn,
    sunlightMode
  })
})
displayRouter.get('/getData', async (req, res) => {
  const mode = await displayModel.findOne({ name: 'SDmode' })
  const ReadingSchedule = await displayModel.findOne({
    name: 'ReadingSchedule'
  })
  const ReadingMode = await displayModel.findOne({ name: 'ReadingMode' })
  const brightnessBar = await displayModel.findOne({ name: 'brightnessBar' })
  const Colour = await displayModel.findOne({ name: 'Colour' })
  const RefreshRate = await displayModel.findOne({ name: 'RefreshRate' })
  const RefreshMode = await displayModel.findOne({ name: 'RefreshMode' })
  const TextSize = await displayModel.findOne({ name: 'TextSize' })
  const VrMode = await displayModel.findOne({ name: 'VrMode' })
  const Font = await displayModel.findOne({ name: 'Font' })
  const Fonts = await displayModel.find({ name: 'Fonts' })
  const ColorScheme = await displayModel.findOne({ name: 'ColorScheme' })

  // console.log(ReadingMode)
  res.status(200).json({
    mode,
    brightnessBar,
    ReadingSchedule,
    ReadingMode,
    Colour,
    RefreshRate,
    TextSize,
    VrMode,
    Font,
    RefreshMode,
    Fonts,
    ColorScheme
  })
})
export default displayRouter
