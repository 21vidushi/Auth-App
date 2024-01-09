const User=require("../models/userschema");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.signup=async(req,res)=>{
    try{
     const{name,email,password,role}=req.body;
     const checkemail= await User.findOne({email});
     if(checkemail){
        return res.status(500).json({
            sucess:false,
            message:"User already exists",
        });
     }
     let hashPassword;
     try{
       hashPassword= await bcrypt.hash(password,10);
     }
     catch{
         return res.status(500).json({
            sucess:false,
            message:"Hasing fails",
        });
     }

       const user= await User.create({
        name,email,password:hashPassword,role
       }) 
        return res.status(200).json({
        sucess:true,
        message:"User created sucessfully",
       });

    }
    catch{
       res.status(500).json({
            sucess:false,
            message:"Fails guys"

        })
    }
}

exports.login= async(req,res)=>{
      try{
        const {email,password}=req.body;
        if(!email||!password){
             return res.status(500).json({
                sucess:false,
                message:"Please fill all details",
            });
        }
        let finduser = await User.findOne({email});
        if(!finduser){
            return res.status(500).json({
                sucess:false,
                message:"User not registered",
            });
        }
        const payload={
            name:finduser.name,
            email:finduser.email,
            id:finduser._id,
            role:finduser.role
        }
        if(await bcrypt.compare(password,finduser.password)){
               let token= jwt.sign(payload,process.env.JWT,{
                expiresIn:"24h",
               });
               finduser=finduser.toObject();
               finduser.token=token;
               finduser.password=undefined;
               const options={
                  expires: new Date(Date.now()+3*24*60*60*1000),
                  httpOnly:true,
               }

                 res.cookie("Tokencookie",token,options).status(200).json({
                sucess:true,
                finduser,
                token,
                message:"User login successfully",
               });
        }
        else{
            return res.status(500).json({
                sucess:false,
                message:"Password is incoorect ",
            });
        }
      }
      catch{
        return res.status(500).json({
            sucess:false,
            message:"request Failed",
        })
      }
}