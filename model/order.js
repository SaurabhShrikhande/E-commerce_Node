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
        type : [createProduct]   //[] array
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
});

const addressSchema = new mongoose.Schema({
    address : {
        type : String,
        required : false,
        default : ""
    },
    state : {
        type : String,
        required : false,
        default : ""
    },
    city : {
        type : String,
        required : false,
        default : ""
    },
    pin : {
        type : String,
        required : false,
        default : ""
    },
    
})

const orderSchema = new mongoose.Schema({
    cart : {
       type : cartSchema,
       require : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    amout : {
        type : Number,
        require : true
    },
    coupen : {
        type : mongoose.Schema.Types.ObjectId,  // np array bcz usser must apply one coupon
        require : false,
        default : null,
    },

    deliveryAddress : {
        type : addressSchema,
        required : true,
    },
    orderPlaceAt : {
        type : Date,
        require : true
    },
    deliveryDate : {
      type : Date,
      required : true
    },

    orderStatus : {
        type : String,
        required : true
    },
    modeOfPayment : {
        type : String,
        required : true
    },
    transitionId : {
        type : String,
        required : false,
        default : ""
    },
})


const orderModel  = mongoose.model("orders", orderSchema);

module.exports = orderModel;
