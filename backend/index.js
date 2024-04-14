import express from 'express'
import cors from 'cors'
import hotspotRouter from './Routes/hotspotRouter.js'

import BluetoothRouter from './Routes/bluetoothRouter.js'
import wifiRouter from './Routes/WifiRouter.js'
import displayRouter from './Routes/displayRouter.js'
import aboutRouter from './Routes/aboutRouter.js'
import simRouter from './Routes/simRouter.js'
import soundRouter from './Routes/soundRouter.js'
import connectionRouter from './Routes/connectionRouter.js'
const app = express()
app.use(express.json())
app.use(cors())
const port = 800

// if data is from PortableHotspot
app.use('/hotspot', hotspotRouter)
app.use('/bluetooth', BluetoothRouter)
app.use('/wifi', wifiRouter)
app.use('/display', displayRouter)
app.use('/about', aboutRouter)
app.use('/sim', simRouter)
app.use('/sound', soundRouter)
app.use('/connection', connectionRouter)

app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}`)
})
