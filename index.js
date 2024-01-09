const express=require("express");
const app= express();

require("dotenv").config();
app.use(express.json());
const PORT= process.env.PORT||4000;
const Userroute=require("./routes/user");
app.use('/api/v1',Userroute);

 const connect=require("./config/database");
 connect();

app.listen(PORT,()=>{
    console.log(`Succesfully running at port ${PORT}`);
})