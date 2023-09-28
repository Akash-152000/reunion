const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const connectToMongo = require('./config/dbConnection')


// Route imports
const property = require('./routes/propertyRoute')

const app = express();

// Config
dotenv.config()



// Middlewares
app.use(express.static(path.resolve('./public')))
app.use(express.json())

// MongoDB Connection
connectToMongo();


// Routes
app.use('/api',property)




app.listen(process.env.PORT,()=>console.log(`Server Running on port: ${process.env.PORT}`))