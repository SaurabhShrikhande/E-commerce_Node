const coupenModel = require("../model/coupon")

const createCoupon = async (req, res) => {
// console.log(req.body);

await coupenModel.create(req.body)
res.json({
    sucess : true,
    massage : "Coupen Created"

})

}

const getCoupon = async (req, res) => {
  const couponList = await coupenModel.find({isActive : true })
    res.json({
        sucess : true,
        massage : " got Coupen",
        result : couponList
    })
    }

    module.exports = {
        createCoupon,
        getCoupon
    }