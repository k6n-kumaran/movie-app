import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import { connectDB } from './config/db.js'
import favoriteRoute from './routes/favoriteRoute.js'


dotenv.config()
connectDB()
const port = process.env.PORT || 4000

const app = express()
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth',authRoute)
app.use('/api/favorites',favoriteRoute)


app.listen(port,() => {
    console.log(`Server is running on port ${port}`);  
})