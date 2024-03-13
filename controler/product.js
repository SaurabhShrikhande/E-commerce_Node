
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


const editProduct = (req, res) => {
   
  res.json({
    sucess : true,
    massage : "Edit product sussesfully"
  })
}

const likeDislike = async (req, res) => {   
 // console.log("req.body", req.body)
 // console.log("req.param.action", req.params.action)   //not param its params  // s imp 
 console.log("req.param.action", req.user.id)
  if (req.params.action === "like"){
                                                                                // important push insted of set   
                                                                                                      //req.body.id from other option req.user.id from auth)  
    const UpdatedProduct  = await productModel.findByIdAndUpdate(req.params.productId , {$push : {like : req.user.id}, $pull : { dislike : req.user.id} })
   //  console.log(UpdatedProduct)                               //req,params.productId endpoint  /:productId/:action
  }

  if (req.params.action === "dislike"){
    // important push insted of set     
     const UpdatedProduct  = await productModel.findByIdAndUpdate(req.params.productId , {$push : { dislike : req.user.id}, $pull : { like : req.user.id} })
        console.log(UpdatedProduct)
}     

if (req.params.action === "nutral"){
  // important push insted of set     
   const UpdatedProduct  = await productModel.findByIdAndUpdate(req.params.productId , {$pull : { like : req.user.id , dislike : req.user.id} })
      console.log(UpdatedProduct)
}     

  res.json({
    sucess : true,
    massage : "Like Dislike product sussesfully"
  })
}

const productDetail = async (req,res) => {

const productDetail = await productModel.findById(req.body.productId)
.populate("like")
.populate("dislike")

  res.json({
    sucess : true,
    massage : "Product Detail API sucessfully",
    result : productDetail
  })
}


module.exports = {
    createProduct,
    getProduct,
    editProduct,

    likeDislike,
    productDetail

};