const mongoose = require("mongoose");

const createProduct = new mongoose.Schema({
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        require : true
    },
    quantity : {
        type : Number
    },
    color : {
        type : String
    },
    price : {
       type : Number
    }
})

const cartSchema = new mongoose.Schema({
    products : {
        type : [createProduct]
    },
    cartTotal : {
         type : Number,
         require : false,
         default : 0
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },



})