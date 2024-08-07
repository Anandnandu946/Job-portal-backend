//1. import mongoose
const mongoose = require('mongoose')

//schema creation
const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

//create model
const jobs = mongoose.model('jobs',jobSchema)

module.exports = jobs