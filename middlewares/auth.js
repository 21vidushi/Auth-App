const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>{
    try{
    let token=req.body.token;
     if(!token){
        return res.status(401).json({
            sucess:false,
            message:"Token not available"
        });
     }
     try{
        const decode=jwt.verify(token,process.env.JWT);
        console.log(decode);
        req.user=decode;

     }
     catch(error){
        res.status(500).json({
            sucess:false,
            message:"Invalid Token user"
        });
     }
     next();
}
catch(error){
    res.status(500).json({
        sucess:false,
        message:"Invalid Token user last one "
    });
}
}

exports.isStudent=(req,res,next)=>{
    try{
      if(req.user.role!=="Student"){
        res.status(401).json({
            sucesss:false,
            message:"User not verifies"

        });
      }
      next();
    }
    catch(error){
        res.status(500).json({
            sucess:false,
            message:"IUser not verified as student"
        });
    }
}
exports.isAdmin=(req,res,next)=>{
    try{
      if(req.user.role!=="Admin"){
        res.status(401).json({
            sucesss:false,
            message:"User not verifies"

        });
      }
      next();
    }
    catch(error){
        res.status(500).json({
            sucess:false,
            message:"IUser not verified as Admin"
        });
    }
}