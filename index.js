const express = require('express')
const dotenv = require('dotenv')
const connectToMongo = require('./config/dbConnection')


// Config
dotenv.config()

// MongoDB Connection
connectToMongo();

const app = express();

app.listen(process.env.PORT,()=>console.log(`Server Running on port: ${process.env.PORT}`))