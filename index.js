const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const connectToMongo = require('./config/dbConnection')


// Config
dotenv.config()

const app = express();

// Middlewares
app.use(express.static(path.resolve('./public')))

// MongoDB Connection
connectToMongo();





app.listen(process.env.PORT,()=>console.log(`Server Running on port: ${process.env.PORT}`))