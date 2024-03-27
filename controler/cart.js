const cartModel = require("../model/cart")
const ProductModel = require("../model/product")

const createCart =async (req , res) => {
  //  console.log(req.body);  // object
   // console.log(req.body.products);   // array

   //two step solution 
   const userCart = await cartModel.findOne({userId : req.user.id})
   
  // console.log(userCart) // 1st null

  if(userCart){    //cart exist
           
  } else  {     //cart dont exist
       let cartTotal = 0;
       const productsTOAdd = [];
       for (let i = 0 ; i < req.body.products.length; i++) {
           const currenProduct = req.body.products[i];
         
          // const product = await ProductModel.findById(currenProduct.productId , {
            const {price } = await ProductModel.findById(currenProduct.productId , {
          price : 1,   //to find the spcific field 1 ,to ignore 0
            _id : 0
           })

           const product  = {
            ...currenProduct , 
            price
          };
          productsTOAdd.push(product);

        //    console.log("Product Details" , i , product);  
        //  output format -  Product Details 0 { price: 55555 }
        //     Product Details 1 { price: 55555 }
          const priceForProduct = currenProduct.quantity * price;
          cartTotal += priceForProduct;
       }  
       console.log(productsTOAdd);
       console.log(cartTotal)
          cartModel.create({
            products : productsTOAdd,
            cartTotal : cartTotal,
            userId : req.user.id
          })
  }
        res.json({
            sucess : "true",
            massage : "Cart created and sussesfully updated"
        })
}
const getCart = (req , res) => {
    res.json({
        sucess : "true",
        massage : "Cart created"
    })
}

module.exports = {
     createCart,
     getCart
}