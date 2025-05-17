import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import blogRoutes from './routes/blogRoutes.js'
dotenv.config()

const app = express()
app.use(express.json());
app.use(cors({
  origin : 'http://localhost:5173',
}))

app.use('/api/blog',blogRoutes)
const PORT = process.env.PORT || 6000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB()
})