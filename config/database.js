const mongoose=require("mongoose");
require("dotenv").config();

const dbconnect=()=>{
    mongoose.connect(process.env.URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    .then(()=>{console.log("successfully connected");})
    .catch((error)=>{
         console.log("Error comes");
         console.log(error);
         process.exit(1);
    })
}

module.exports=dbconnect;