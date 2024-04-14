import express, { json } from 'express'

import soundModel from '../Models/SoundModel.js'
import { modelNames } from 'mongoose'

// connectDB()
let toggle = false

const soundRouter = express.Router()

soundRouter.post('/toggle', async (req, res) => {
  const name = req.body.name
  // console.log(req.body)

  toggle = !toggle
  const setData = { btnStatus: toggle }
  const response = await soundModel.findOneAndUpdate(
    { name: name },
    { $set: setData },
    {
      upsert: true,
      new: true
    }
  )
  res.status(201).json(response)
})

soundRouter.post('/data', async (req, res) => {
  const name = req.body.data.name
  console.log(req.body)
  const setData = {
    name: req.body.data.name,
    range: req.body.data.range,
    mode: req.body.data.type
  }

  const response = await soundModel.findOneAndUpdate(
    { name: name },
    { $set: setData },
    {
      upsert: true,
      new: true
    }
  )
  res.status(201).json(response)
})
soundRouter.get('/status', async (req, res) => {
  const SilentMedia = await soundModel.findOne({ name: 'SilentMedia' })
  const SilentMode = await soundModel.findOne({ name: 'SilentMode' })
  const VibrateForCalls = await soundModel.findOne({
    name: 'Vibrate for calls'
  })
  const ControlNotificationSound = await soundModel.findOne({
    name: 'ControlNotificationSound'
  })
  const VibrateInSilentMode = await soundModel.findOne({
    name: 'Vibrate in Silent Mode'
  })
  const HepticFeedback = await soundModel.findOne({
    name: 'Haptic feedback'
  })

  const AdjustMediaSound = await soundModel.findOne({
    name: 'AdjustMediaSound'
  })
  const AllowSpeakerSound = await soundModel.findOne({
    name: 'AllowSpeakerSound'
  })
  const MultipleAudioSrcs = await soundModel.findOne({
    name: 'MultipleAudioSources'
  })
  const DialPadTone = await soundModel.findOne({ name: 'DialPadTones' })
  const TapSounds = await soundModel.findOne({ name: 'TapSounds' })
  const SoundLocking = await soundModel.findOne({ name: 'SoundLocking' })
  const SoundScreenshot = await soundModel.findOne({
    name: 'SoundScreenshot'
  })
  const SoundUninstalling = await soundModel.findOne({
    name: 'SoundUninstalling'
  })
  const SoundDeleting = await soundModel.findOne({ name: 'SoundDeleting' })
  const SoundCharging = await soundModel.findOne({ name: 'SoundCharging' })
  const SoundStartup = await soundModel.findOne({ name: 'SoundStartup' })
  const DoNotDisturb = await soundModel.findOne({ name: 'DoNotDisturb' })
  const DeviceLock = await soundModel.findOne({ name: 'DeviceLock' })
  const NotifyRepeatCall = await soundModel.findOne({
    name: 'NotifyRepeatCall'
  })
  const DolbyAtmos = await soundModel.findOne({ name: 'DolbyAtmos' })
  res.status(200).json({
    SilentMode,
    SilentMedia,
    HepticFeedback,
    VibrateForCalls,
    VibrateInSilentMode,
    ControlNotificationSound,
    AllowSpeakerSound,
    AdjustMediaSound,
    MultipleAudioSrcs,
    DialPadTone,
    TapSounds,
    SoundLocking,
    SoundScreenshot,
    SoundUninstalling,
    SoundDeleting,
    SoundCharging,
    SoundStartup,
    DeviceLock,
    NotifyRepeatCall,
    DoNotDisturb,
    DolbyAtmos
  })
})
soundRouter.get('/getData', async (req, res) => {
  const MediaBar = await soundModel.findOne({ name: 'MediaBar' })
  const RingtoneBar = await soundModel.findOne({ name: 'RingtoneBar' })
  const AlarmBar = await soundModel.findOne({ name: 'AlarmBar' })
  const NotificationBar = await soundModel.findOne({ name: 'NotificationBar' })
  const NotifyCall = await soundModel.findOne({ name: 'NotifyCall' })
  const Preset = await soundModel.findOne({ name: 'Preset' })
  const HeadphoneRemote = await soundModel.findOne({ name: 'HeadphoneRemote' })
  const GraphicEqualizer = await soundModel.findOne({
    name: 'GraphicEqualizer'
  })

  const Equalizers = await soundModel.find({ name: 'Equalizers' })
  res.status(200).json({
    MediaBar,
    GraphicEqualizer,
    RingtoneBar,
    AlarmBar,
    Preset,
    NotificationBar,
    HeadphoneRemote,
    NotifyCall,
    Equalizers
  })
})

soundRouter.post('/equalizers', async (req, res) => {
  // console.log(req.body.updateEqua.equa2)
  const setData = { Equalizers: req.body.updateEqua }
  try {
    const response = await soundModel.findOneAndUpdate(
      {
        $and: [{ name: req.body.name }, { mode: req.body.mode }]
      },
      { $set: setData },
      {
        upsert: true,
        new: true
      }
    )
    res.status(200).json(response)
  } catch (err) {
    console.log('error while getting data ', err)
  }
})
soundRouter.get('/equalizer/:id', async (req, res) => {
  // console.log(req.body.updateEqua.equa2)
  // const setData={Equalizers:req.body.updateEqua}
  try {
    const response = await soundModel.findOne({
      $and: [{ name: 'Equalizers' }, { mode: req.params.id }]
    })
    console.log(response)
    res.status(200).json(response)
  } catch (err) {
    console.log('error while sending data')
  }
})
export default soundRouter
