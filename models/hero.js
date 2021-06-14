const mongoose = require('mongoose')
const heroSchema = require('mongoose').Schema({
    name:{
        type: String,
        required: true
    },
    superpower:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Hero', heroSchema)