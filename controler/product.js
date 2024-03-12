
const jwt = require("jsonwebtoken")
const productModel = require("../model/product.js")

const createProduct = async (req,res) => {
  /*  // console.log(req.headers.authorization)   //token
                                   const payload =  jwt.decode(req.headers.authorization);
    // console.log(payload);
     try {   // for maintain integrity of token (signature play imp role)
                  const data =  jwt.verify(req.headers.authorization, "fjkfsjofjfj65654hhff")
        // console.log(data);
    }
     catch (err){
        console.log(err);
        return  res.status(403).json({
            sucess : false,
            massage : "Forbidden"
          })
     }  */


   // console.log(req.body);
   //const newProduct = await productModel.create(req.body)

  /* if(payload.role === "admin" || payload.role === "seller" ){ */

       await productModel.create(req.body)
        res.json({
            sucess : true,
            massage : "product created sussesfully"
          })
  /*  }
    else{
    res.status(403).json({
        sucess : false,
        massage : "Forbidden"
      })
   } */
}

const getProduct = (req,res) => {
      

    res.json({
        sucess : true,
        massage : "get product sussesfully"
      })
}


module.exports = {
    createProduct,
    getProduct
};