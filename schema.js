const mongoose = require('mongoose')

const product = new mongoose.Schema({
    featured:{
        type: Boolean,
        default: false,
    },
    name:{
        type : String,
        required : [true, "Name can't be empty"]
    },
    price:{
        type: Number,
        required :[true, "Product must have a price"]
    },
    rating:{
        type: Number,
        required : false
    },
    company:{
        type: String,
        enum: {values : ['ikea', 'liddy', 'caressa', 'marcos'], message : "{Value} can't be company for the product"},
        required: [true, "Product must have the company name"]
    },
    createdAt :{
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('product', product)