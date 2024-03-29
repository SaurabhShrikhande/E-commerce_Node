const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    couponCode : {
       type : String,
       require : true,
       unique : true,
    } ,
    discountPercent : {
        type : Number,
        require : true,
     } ,
    maxDiscount : {
        type : Number,
        require : true,
     } ,
    startDate : {
        type : Date,
        require : true,
     },
    endDate : {
        type : Date,
        require : true,
     },
     isActive : {
        type : Boolean,
        default : false,
     }
})

const couponModel =  mongoose.model("coupons" , couponSchema);

module.exports = couponModel;