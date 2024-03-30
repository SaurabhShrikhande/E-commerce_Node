const orderModel = require("../model/order");
const cartModel = require("../model/cart")
const couponModel = require("../model/coupon");

const dayjs = require("dayjs") //momentjs large size depriciate
const createOrder = async(req, res) =>{
    /*
    1 extract cart
    2 get cart & apply coupen
    3 pament COD skip payment
    4 check deliver address 
  
    5 delete the user cart after order placed sussesfull
    6 coupen multiple time?
    7 delivery time OTP, verification
    8  inventory / Stock vlaues to be updated
    9 
    */

    const userCart = await cartModel.findOne({userId : req.user.id})
    if(!userCart){
        return res.status(400).json({
            sucess : false,
            massage : "Empty cart"
        })
    }
    
    const couponCode = req.body.coupon;   //if coopen "" then responce false
   
    // const coupon = await couponModel.findOne({ couponCode : couponCode })
    const coupon = await couponModel.findOne({ couponCode })
    if(!coupon){
        return res.status(400).json({
            sucess : false,
            massage : "Invalid coupon code"
        })
    }

    //date comparison //new 
   // console.log(coupon.startDate , coupon.endDate )
    const coupunStarDate = dayjs(coupon.startDate);
    const coupenEndDate =  dayjs(coupon.endDate);
    const currentDateTime = dayjs();

    // if(!(currentDateTime.isAfter(coupunStarDate) && currentDateTime.isBefore(coupenEndDate))){
    // }

    if((currentDateTime.isBefore(coupunStarDate) && currentDateTime.isAfter(coupenEndDate))){
        return res.status(400).json({
            sucess : false,
            massage : " coupen expire or Invalid Start or End Date of coupen"
        })
    }

    const cartTotal = userCart.cartTotal; 

    let coupunDiscount = ((cartTotal / 100) * coupon.discountPercent)
    
   if(coupunDiscount > coupon.maxDiscount){
    coupunDiscount = coupon.maxDiscount;
   }

   const payableAmt = (cartTotal - coupunDiscount).toFixed(2);

    if(req.body.modeOfPayment === "COD"){
           // dont genrate transition id & dont redirect to payment Gateway
   
    } else{
    
    
        
    }

    deliveryAddress = req.body.deliveryAddress;
    if(!deliveryAddress){
        deliveryAddress = req.user.address;  
    }

     const deliveryDate = dayjs().add(7, "day");
    const orderDetails = {
       cart : userCart,
       userId : req.user.id,
       amount : payableAmt,
       coupon : coupon._id,
       deliveryAddress,
       orderPlaceAt :  currentDateTime,
       deliveryDate,
       orderStatus : "PLACED",                  
        //PLACED, PACKED, INTRANSIT , OUT FOR DELIVERY , DELIVERED, RETURENED , REFUND AWATED, REFUND INITIATED ,REFUND RECEIVED
        modeOfPayment : req.body.modeOfPayment,
    }

    const newOrder = await orderModel.create(orderDetails);

    res.json({
        success : "true",
        massage : "Oreder Placed Sucessfully",
        orderId : newOrder._id
    })
}

const getOrder = async(req, res) =>{
    
    res.json({
        success : "true",
        massage : "Get order API"
    })
}


module.exports = {
    createOrder,
    getOrder
}