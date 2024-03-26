const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user");
const { use } = require("../router/user");

const userregister = async (req,res) => {
   try {

     console.log(req.body);
      
  //    const salt = bcrypt.genSaltSync(10);
   //   console.log(salt)
    //  const hash = bcrypt.hashSync( req.body.password , salt);
  // console.log(hash)
   
      const newUser = new userModel({
       ...req.body,
      //   password : hash
      });
      await newUser.save();
      
      // usermodel.insert(req.body);
   
   
       res.json({
         sucess : true,
         massage : "user register sussesfull"
       })

   }
   catch (err){
    console.log(err);
    res.json({
      sucess : false,
      massage : "user register api fail"
    })
   } 
} 


const userlogin = async (req,res) => {
    
const user = await userModel.findOne({email : req.body.email})

if (!user){
 return res.json({
    sucess : false,
    massage : "Invalid userName or Password1"
  })
}

const passmatch =  bcrypt.compareSync(req.body.password, user.password)

   if (!passmatch){
    return res.json({
      sucess : false,
      massage : "Invalid userName or Password2"
    })
  }
else{
  const payload = {
    id : user._id,
    name : user.firstname,
    role : user.role,   //many thing u can put 
    exp : Math.floor((new Date().getTime() / 1000) + 3600),          //epoc converter google(time coverter) 
                     //Date.now()---------      // + 1hr expiry 
  }
                                     //random //optional
  const token = jwt.sign(payload, "fjkfsjofjfj65654hhff") //simple method to create token

  //add tocken to db for prevent multiple login 
 
  res.json({
    sucess : true,
    massage : "user login api",
    token : token
  })
}
} 


const userlogout = (req,res) => {
    
    res.json({
      sucess : true,
      massage : "user logout api"
    })
} 


const addProductToWishlist = async (req, res) =>{ 
 // console.log(req.body.productId);

 await userModel.findByIdAndUpdate(req.user.id , { $push : { wishlist : req.body.productId } })

  res.json({
    sucess : true,
    massage : "Product Added to Wishlist"
  })
   
}

const getProductFromWishlist = async (req , res) => {
                           //new                  //field , projection to require limited data                   // new to get specific field or data
 const user = await userModel.findById(req.user.id /* */ , "wishlist" /* , for multiple */ ).populate("wishlist",/* */  "title price"  /* */ )

  res.json({
    sucess : true,
    massage : " got Product from Wishlist",
    result : user 
  })
}

const saveUserAddress = async (req, res) => {
/* const adres = req.body
const setobj = {}
if(adress.address) {
  setobj.["address.address"] = adres.address  //target , update dynamic key
} */

 const update =  { $set : { address : req.body } }   //new ,schema also
console.log(update);
 const update2 =  await userModel.findByIdAndUpdate(req.user.id , { $set : { address : req.body  /* "address.adress" : req.body.address (for prevent other data in DB)*/ } /* //setobj */ })
 console.log(update2); 

res.json({
    sucess : true,
    massage : "save adress done"
  })
}


module.exports = {
    userregister,
    userlogin,
    userlogout,
    addProductToWishlist,
    getProductFromWishlist,
    saveUserAddress
}
