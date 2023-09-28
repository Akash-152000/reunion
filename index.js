const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const connectToMongo = require('./config/dbConnection')


// // handle Uncaught exceptions
// process.on('uncaughtException',(err)=>{
//     console.log(`Error: ${err.message}`);
//     console.log('Shutting down the server due to Uncaught exceptions');
//     process.exit(1);
// })


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




const server = app.listen(process.env.PORT,()=>console.log(`Server Running on port: ${process.env.PORT}`))

// // Unhandled rejection

// process.on('unhandledRejection',(err)=>{
//     console.log(`Error: ${err.message}`);
//     console.log('Shutting down the server due to unhandled promise rejection');

//     server.close(()=>{
//         process.exit(1);
//     })
// })