
const bcrypt = require("bcrypt")

const mongoose = require("mongoose");

// const userSchema = {
    
//         firstname : {
//             type : String,
//             required: true
//         },
//         lastname : {
//             type : String,
//             required: true
//         },
//         email : {
//             type : String,
//             required: true,
//             unique : true
//         },
//         password : {
//             type : String,
//             required: true
//         },
//         role : {
//             type : String,
//             required: true
//         },
//     }

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


const userSchema = new mongoose.Schema({
    
    firstname : {
        type : String,
        required: true
    },
    lastname : {
        type : String,
        required: true
    },
    email : {
        type : String,
        required: true,
        unique : true
    },
    password : {
        type : String,
        required: true
    },
    role : {
        type : String,
        required: true
    },
    wishlist : {
        type : [mongoose.Schema.Types.ObjectId],
        default : [],
        ref : "products"
    },
    // address : {
    //     type : {
    //          address : String,
    //          State : String,
    //          Pin : String
    //     }
    // }
    address : {
        type : addressSchema   //new 
    },

})

userSchema.pre("save" , function () {
    const salt = bcrypt.genSaltSync(10);
   // console.log(salt)
    const hash = bcrypt.hashSync( this.password , salt);
  //  console.log(hash)
    this.password = hash;
})
const UserModel = mongoose.model("users" , userSchema);


// module.exports = mongoose.model("users" , userSchema);
module.exports =  UserModel;

