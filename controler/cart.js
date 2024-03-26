const  createCart = (req , res) => {
        res.json({
            sucess : "true",
            massage : "Cart created"
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