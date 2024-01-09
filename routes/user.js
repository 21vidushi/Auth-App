const express=require("express");
const router=express.Router();
 const {signup,login} =require('../controllers/usercontroller');
 const{auth,isStudent,isAdmin}=require("../middlewares/auth");
router.post('/signup',signup);
router.post('/login',login);

router.get("/test",auth,(req,res)=>{
    res.status(200).json({
        sucess:true,
        message:"Welcome to the Tested  page"
    });
})
router.get("/student",auth,isStudent,(req,res)=>{
    res.status(200).json({
        sucess:true,
        message:"Welcome to the student page"
    });
})

router.get("/admin",auth,isAdmin,(req,res)=>{
    res.status(200).json({
        sucess:true,
        message:"Welcome to the Admin page"
    });
})

module.exports=router;