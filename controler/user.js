
const usermodel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userregister = async (req,res) => {
   try {

     console.log(req.body);
      
  //    const salt = bcrypt.genSaltSync(10);
   //   console.log(salt)
    //  const hash = bcrypt.hashSync( req.body.password , salt);
  // console.log(hash)
   
      const newUser = new usermodel({
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
    
const user = await usermodel.findOne({email : req.body.email})

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
    name : user.firstname,
    role : user.role,   //many thing u can put 
    exp : Math.floor((new Date().getTime() / 1000) + 3600),          //epoc converter google(time coverter) 
                     //Date.now()---------      // + 1hr expiry 
  }

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


module.exports = {
    userregister,
    userlogin,
    userlogout
}
