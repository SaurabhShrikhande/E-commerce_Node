const express = require("express");
const mongoose = require("mongoose");
const router = require("./router/user.js");

mongoose.connect("mongodb://localhost:27017/ecom")
.then(() => { console.log("db connected")})
.catch((err)=> { console.log(err)} );

const app = express();



app.use(express.json());
app.use("/api/v1/user", router);

app.get("/test" ,(req,res) => {
    
    res.json({
      sucess : true,
      massage : "user post api"
    })
})



app.listen(10000 , ()=> {
    console.log("server is up and running on port 10000");
})