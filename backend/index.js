import express from 'express'
import cors from 'cors'
import hotspotRouter from './Routes/hotspotRouter.js'
import dotenv from "dotenv"
dotenv.config()
import BluetoothRouter from './Routes/bluetoothRouter.js'
import wifiRouter from './Routes/WifiRouter.js'
import displayRouter from './Routes/displayRouter.js'
import aboutRouter from './Routes/aboutRouter.js'
import simRouter from './Routes/simRouter.js'
import soundRouter from './Routes/soundRouter.js'
import connectionRouter from './Routes/connectionRouter.js'
import connectDB from './db.js'
const app = express()
app.use(express.json())
const corsOptions = {
  origin: 'https://settingappfrontend.vercel.app',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
// app.use(cors())
const port  = process.env.PORT || 8000;


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
