const jwt = require("jsonwebtoken");
const userModel = require("../model/user")
// function authMiddleware (role) {
//     return function
// }


const authMiddleware = (role) => async (req, res,next) => {
    try {

        // const token = req.headers.authorization.split(" ")[1];
        const data =  jwt.verify(req.headers.authorization, "fjkfsjofjfj65654hhff")
       
        const payload =  jwt.decode(req.headers.authorization);
        
        if(role.includes(payload.role)){     // and check with db for prevent multiple login // at the time of login latest tocken in db
           // req.userId = payload.id   //myshortcut  
         
           req.user = await userModel.findById(payload.id);
           console.log("req.user" , req.user)
            next();
        }
        else{
          return res.status(403).json({
                sucess : false,
                massage : "Forbidden"
              })
        }


    }
    catch{
        return res.status(403).json({
            sucess : false,
            massage : "Forbidden"
          })
    }
}


module.exports = authMiddleware;