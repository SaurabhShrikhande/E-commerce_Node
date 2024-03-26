const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/user.js");
const productRoutes = require("./router/product.js")
const cartRoutes = require("./router/cart.js")
                   //mongodb://localhost:27017   
mongoose.connect("mongodb://127.0.0.1:27017/ecom")
.then(() => { console.log("db connected")})
.catch((err)=> { console.log(err.message)} );

const app = express();



app.use(express.json());
app.use("/api/v1/user", userRouter);

app.use("/api/v1/product" , productRoutes);

app.use("/api/v1/cart", cartRoutes)



app.get("/test" ,(req,res) => {
    
    res.json({
      sucess : true,
      massage : "user post api"
    })
})



app.listen(10000 , ()=> {
    console.log("server is up and running on port 10000");
})