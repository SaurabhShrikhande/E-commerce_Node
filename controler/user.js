
const usermodel = require("../model/user");
const bcrypt = require("bcrypt");


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
         massage : "user register api"
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

    res.json({
      sucess : true,
      massage : "user login api"
    })
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
