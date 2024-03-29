const orderControler = require("../model/order");

const createOrder = async(req, res) =>{
    
    res.json({
        success : "true",
        massage : "create order API"
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