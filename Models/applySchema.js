//1. import mongoose
const mongoose = require('mongoose')

//schema creation
const applySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    qualifications:{
        type:String,
        required:true
    },
    cvImage:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

//create model
const apply = mongoose.model('apply',applySchema)

module.exports = apply