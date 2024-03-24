const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    
    title : {
        type : String,
        require : true
    },

    description : {
        type : String,
        require : true
    },

    price : {
        type : Number,
        require : true
    },

    stock : {
        type : Number,
        require : true
    },
    brand : {
        type : String,
        require : true
    },
    category : {
        type : String,
        require : true
    },
    like : {
        type : [mongoose.Schema.Types.ObjectId],
        default : [],
        ref : "users"
    },
    dislike : {
        type : [mongoose.Schema.Types.ObjectId],
        default : [],
        ref : "users"
    }, 
    reviews : {
        type : [
            {
                rating : Number ,
                comment : String,
                userId : mongoose.Schema.Types.ObjectId
            }
        ],
        default : []
    }
})


const ProductModel = mongoose.model("products", productSchema)

module.exports = ProductModel;