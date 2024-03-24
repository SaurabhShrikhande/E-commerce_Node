
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
 // console.log("req.user.id", req.user.id)
  if (req.params.action === "like"){
    // logic remain if alredy like then do not permit to like again   //done line no 65 //if put pull in starting in line no 68 will not work
    const deleteprevious = await productModel.findByIdAndUpdate(req.params.productId , { $pull : { like : req.user.id} })
                                                                                // important push insted of set   
                                                                                                      //req.body.id from other option req.user.id from auth)  
    const UpdatedProduct  = await productModel.findByIdAndUpdate(req.params.productId , {$push : {like : req.user.id}, $pull : { dislike : req.user.id} /* , $inc :(likecount : 1 ) for dec -1 , for like count like array size */ })
   //  console.log(UpdatedProduct)                               //req,params.productId endpoint  /:productId/:action
  }

  if (req.params.action === "dislike"){
    const deleteprevious = await productModel.findByIdAndUpdate(req.params.productId , { $pull : { dislike : req.user.id} })
    // important push insted of set                                                                 //const update =  {}
     const UpdatedProduct  = await productModel.findByIdAndUpdate(req.params.productId , { $push : { dislike : req.user.id}, $pull : { like : req.user.id} })
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

 const  reviews = async (req, res) => {
  try{
    /*
       productId : from URL params 
       Rating and comment : body,
       userId : Auth
    */
   
      // console.log("req.params.productId , req.body , req.user.id ", req.params.productId , req.body , req.user.id )
   
      const product = await productModel.findById(req.params.productId);
     // console.log(product.reviews);
   
      //sir said,  include run on normal array
      // it array of object here used find method by sir
       //normal javascript 
   
       const reviewAvl = product.reviews.find((reviewavl) => reviewavl.userId.toString() === req.user.id.toString() )
   
      // console.log("avl", avl);
   
       if (reviewAvl){
         // learn how to update subdocument
           console.log("Exist")
         
           const findobj =  {
             reviews : {
               $elemMatch : {
                  userId : req.user.id
                }
               }
             }
   
           const updateObj = {
              $set : {
                   "reviews.$.rating" : req.body.rating,
                   "reviews.$.comment" : req.body.comment
              } 
           }
         //  await productModel.findByIdAndUpdate(req.params.productId, updateObj)  //  Xwrong //focus here
          //  await productModel.findOneAndUpdate(findobj , updateObj);
        //  await productModel.findOne(findobj , updateObj);
         const res =  await productModel.updateOne(findobj , updateObj);
          //  console.log(res) //match count update count
        }
        else{
         const review = await productModel.findByIdAndUpdate(req.params.productId ,
          { $push : { reviews : {      
             rating : req.body.rating,
             comment : req.body.comment,
             userId : req.user.id
          } } },
          {              //mongoose updated without true but|>
            new : true,  //just  required for console new data
          }  
          )
      
        //  console.log(review);
       }
   
     res.json({
       sucess : true,
       massage : "Review updated and saved . // API sucessfully",
      
     })
  } catch (err) {
    console.log(err);
  }
 }


module.exports = {
    createProduct,
    getProduct,
    editProduct,

    likeDislike,
    productDetail,

    reviews

};