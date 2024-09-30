const mongoose = require('mongoose')

const DB = process.env.DATABASE
mongoose.connect(DB)
.then(()=>console.log('DataBase Connection Successfull'))
.catch((e)=>console.log('DataBase Connection UnSuccessfull' + e))